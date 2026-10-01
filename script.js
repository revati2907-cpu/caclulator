// ==========================================
// CREDITCALC - SUPABASE AUTH + ADMIN + SGPA
// ==========================================
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123";

// ---------- STORAGE ----------
function getUsers() {
    return [];
}

function saveUsers(users) {
    // Student accounts are stored in Supabase Authentication.
}

function getResults() {
    return JSON.parse(localStorage.getItem("creditcalc_results") || "[]");
}

function saveResults(results) {
    localStorage.setItem("creditcalc_results", JSON.stringify(results));
}

// ---------- SUPABASE STUDENT AUTH ----------
function showMessage(message, isError = false) {
    const el = document.getElementById("authMessage");
    if (!el) return;
    el.textContent = message;
    el.className = "auth-message " + (isError ? "error" : "success");
}

function authClient() {
    try { return window.getSupabaseClient(); }
    catch (error) { showMessage(error.message, true); throw error; }
}

async function login() {
    const email = document.getElementById("loginEmail")?.value.trim();
    const password = document.getElementById("loginPassword")?.value || "";
    if (!email || !password) return;
    const { error } = await authClient().auth.signInWithPassword({ email, password });
    if (error) { showMessage(error.message, true); return; }
    window.location.href = "calculator.html";
}

async function signup() {
    const name = document.getElementById("signupName")?.value.trim();
    const email = document.getElementById("signupEmail")?.value.trim();
    const password = document.getElementById("signupPassword")?.value || "";
    const confirm = document.getElementById("signupConfirmPassword")?.value || "";
    if (password !== confirm) { showMessage("Passwords do not match.", true); return; }
    const { data, error } = await authClient().auth.signUp({
        email, password, options: { data: { full_name: name } }
    });
    if (error) { showMessage(error.message, true); return; }
    if (data.session) {
        await authClient().auth.signOut();
    }
    showMessage("Account created successfully. Please login.");
    setTimeout(() => { window.location.href = "login.html"; }, 900);
}

async function logout() {
    await authClient().auth.signOut();
    window.location.href = "index.html";
}

// ---------- ADMIN LOGIN (kept separate from student Supabase auth) ----------
function showAdminLogin() { const box = document.getElementById("adminLoginBox"); if (box) box.style.display = "flex"; }
function closeAdminLogin() { const box = document.getElementById("adminLoginBox"); if (box) box.style.display = "none"; }
function adminLogin() {
    const username = document.getElementById("adminUsername")?.value.trim();
    const password = document.getElementById("adminPassword")?.value || "";
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        sessionStorage.setItem("creditcalc_login", "yes"); sessionStorage.setItem("creditcalc_role", "admin"); window.location.href = "admin.html";
    } else alert("Invalid admin username or password.");
}
function adminLogout() { sessionStorage.clear(); window.location.href = "index.html"; }

// ---------- CALCULATOR ----------
function getGrade(marks) {
    if (marks >= 90) return ["O", 10];
    if (marks >= 80) return ["A+", 9];
    if (marks >= 70) return ["A", 8];
    if (marks >= 60) return ["B+", 7];
    if (marks >= 50) return ["B", 6];
    if (marks >= 40) return ["C", 5];
    return ["F", 0];
}

async function showCalculator() {
    const welcome = document.getElementById("welcome");
    if (!welcome) return;
    const { data } = await authClient().auth.getUser();
    const email = data.user?.email || "Student";
    welcome.textContent = "Welcome, " + email;
}

async function calculate() {
    const rows = document.querySelectorAll("#subjectRows tr");
    let totalCredits = 0;
    let totalPoints = 0;
    let failed = false;
    let hasMarks = false;
    const subjects = [];

    for (const row of rows) {
        const subjectInput = row.querySelector(".subject");
        const creditInput = row.querySelector(".credit");
        const marksInput = row.querySelector(".marks");
        const gradeCell = row.querySelector(".grade");
        const pointCell = row.querySelector(".point");

        if (!subjectInput || !creditInput || !marksInput) continue;

        const subject = subjectInput.value.trim();
        const credit = Number(creditInput.value);

        if (marksInput.value === "") {
            gradeCell.textContent = "-";
            pointCell.textContent = "-";
            continue;
        }

        hasMarks = true;
        const marks = Number(marksInput.value);

        if (!Number.isFinite(marks) || marks < 0 || marks > 100 || credit <= 0) {
            alert("Please enter valid marks (0-100) and credits greater than 0.");
            return;
        }

        const grade = getGrade(marks);
        gradeCell.textContent = grade[0];
        pointCell.textContent = grade[1];

        totalCredits += credit;
        totalPoints += credit * grade[1];
        if (marks < 40) failed = true;

        subjects.push({
            subject,
            credit,
            marks,
            grade: grade[0],
            point: grade[1]
        });
    }

    if (!hasMarks) {
        alert("Please enter marks for at least one subject.");
        return;
    }

    const sgpa = totalCredits > 0 ? totalPoints / totalCredits : 0;
    const status = failed ? "FAIL" : "PASS";

    const studentName = document.getElementById("studentName").value.trim();
    const rollNo = document.getElementById("rollNo").value.trim();
    const semester = document.getElementById("semester").value;

    document.getElementById("resultName").textContent = studentName || "-";
    document.getElementById("resultRoll").textContent = rollNo || "-";
    document.getElementById("resultSemester").textContent = semester || "-";
    document.getElementById("totalCredits").textContent = totalCredits;
    document.getElementById("sgpa").textContent = sgpa.toFixed(2);
    document.getElementById("status").textContent = status;

    const results = getResults();
    results.push({
        username: (await authClient().auth.getUser()).data.user?.email || "Unknown",
        studentName,
        rollNo,
        semester,
        totalCredits,
        sgpa: Number(sgpa.toFixed(2)),
        status,
        subjects,
        date: new Date().toLocaleString()
    });
    saveResults(results);

    alert("Result calculated and saved successfully.");
}

// ---------- ADMIN DASHBOARD ----------
function loadAdminDashboard() {
    const users = getUsers();
    const results = getResults();

    const userCount = document.getElementById("userCount");
    const resultCount = document.getElementById("resultCount");
    const passCount = document.getElementById("passCount");
    const failCount = document.getElementById("failCount");
    const usersTable = document.getElementById("usersTable");
    const resultsTable = document.getElementById("resultsTable");

    if (!userCount || !resultCount || !passCount || !failCount || !usersTable || !resultsTable) return;

    userCount.textContent = users.length;
    resultCount.textContent = results.length;
    passCount.textContent = results.filter(r => r.status === "PASS").length;
    failCount.textContent = results.filter(r => r.status === "FAIL").length;

    usersTable.innerHTML = "";
    users.forEach((user, index) => {
        const userResults = results.filter(r => r.username === user.username);
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${escapeHtml(user.username)}</td>
            <td>${user.createdAt ? new Date(user.createdAt).toLocaleString() : "-"}</td>
            <td>${userResults.length}</td>
        `;
        usersTable.appendChild(row);
    });

    resultsTable.innerHTML = "";
    results.forEach(result => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${escapeHtml(result.date || "-")}</td>
            <td>${escapeHtml(result.username || "-")}</td>
            <td>${escapeHtml(result.studentName || "-")}</td>
            <td>${escapeHtml(result.rollNo || "-")}</td>
            <td>${escapeHtml(result.semester || "-")}</td>
            <td>${escapeHtml(String(result.totalCredits ?? "-"))}</td>
            <td><strong>${escapeHtml(String(result.sgpa ?? "-"))}</strong></td>
            <td>${escapeHtml(result.status || "-")}</td>
        `;
        resultsTable.appendChild(row);
    });
}

function escapeHtml(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function clearAllData() {
    if (!confirm("Delete ALL students and results?")) return;
    localStorage.removeItem("creditcalc_users");
    localStorage.removeItem("creditcalc_results");
    loadAdminDashboard();
    alert("All student data deleted.");
}

// ---------- PAGE LOAD ----------
document.addEventListener("DOMContentLoaded", async function () {
    const calculator = document.getElementById("calculator");
    const adminDashboard = document.getElementById("adminDashboard");

    const loginForm = document.getElementById("loginForm");
    if (loginForm) loginForm.addEventListener("submit", function (e) { e.preventDefault(); login(); });
    const signupForm = document.getElementById("signupForm");
    if (signupForm) signupForm.addEventListener("submit", function (e) { e.preventDefault(); signup(); });

    if (calculator) {
        try {
            const { data } = await authClient().auth.getUser();
            if (!data.user) {
                window.location.replace("login.html");
                return;
            }
            await showCalculator();
        } catch (error) {
            // Keep the calculator protected when Supabase is unavailable/configuration is missing.
            window.location.replace("login.html");
            return;
        }
    }

    if (adminDashboard) {
        if (sessionStorage.getItem("creditcalc_role") !== "admin") {
            window.location.href = "index.html";
            return;
        }
        loadAdminDashboard();
    }
});