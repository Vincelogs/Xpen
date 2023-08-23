import { showDashboard } from './dashboard.js';
import { showExpenses } from './expenses.js';
import { showProfile } from './profile.js';

// Attach event listeners to navigation links
document.getElementById('dashboard-link').addEventListener('click', showDashboard);
document.getElementById('expenses-link').addEventListener('click', showExpenses);
document.getElementById('profile-link').addEventListener('click', showProfile);

// Initialize app by showing the dashboard
showDashboard();
