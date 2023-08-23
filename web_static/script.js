const dashboard = document.getElementById('dashboard');
const expenses = document.getElementById('expenses');
const profile = document.getElementById('profile');

// Functions to switch views
function showDashboard() {
    dashboard.style.display = 'block';
    expenses.style.display = 'none';
    profile.style.display = 'none';
}

function showExpenses() {
    dashboard.style.display = 'none';
    expenses.style.display = 'block';
    profile.style.display = 'none';
}

function showProfile() {
    dashboard.style.display = 'none';
    expenses.style.display = 'none';
    profile.style.display = 'block';
}

// Attach click event listeners to navigation links
document.getElementById('dashboard-link').addEventListener('click', showDashboard);
document.getElementById('expenses-link').addEventListener('click', showExpenses);
document.getElementById('profile-link').addEventListener('click', showProfile);

// Initialize app by showing the dashboard
showDashboard();
