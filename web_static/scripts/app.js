import { showDashboard } from './dashboard.js';
import { showExpenses } from './expenses.js';
import { showIncome } from './income.js';
import { showProfile } from './profile.js';

// Attach event listeners to navigation links
document.getElementById('dashboard-link').addEventListener('click', showDashboard);
document.getElementById('expenses-link').addEventListener('click', showExpenses);
document.getElementById('income-link').addEventListener('click', showIncome);
document.getElementById('profile-link').addEventListener('click', showProfile);

// Initialize app by showing the dashboard
showDashboard();

const navLinks = document.querySelectorAll(".navigation-list a");
navLinks.forEach (function(link) {
  link.addEventListener('click', function(event) {
    navLinks.forEach (function(link) {
      link.classList.remove("active");
    });
    event.target.classList.add("active");
    console.log(event.target);
    event.preventDefault();
  }); 
});

