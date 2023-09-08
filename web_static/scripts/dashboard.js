export function showDashboard() {
  const dashboard = document.getElementById('dashboard');
  const expenses = document.getElementById('expenses');
  const income = document.getElementById('income');
  const profile = document.getElementById('profile');

  dashboard.style.display = 'block';
  expenses.style.display = 'none';
  income.style.display = 'none';
  profile.style.display = 'none';

  const balance = document.getElementById('totalBalance');
  const expenseTotal = document.getElementById('totalExpenses');
  let totalExpenses = 0;
  let totalIncome = 0;

  // function to get total expenses and income
  function getTotals () {
    totalExpenses = parseFloat(localStorage.getItem('totalExpenses')) || 0;
    totalIncome = parseFloat(localStorage.getItem('totalIncome')) || 0;
  }

  // load existing totals
  getTotals();

  // Convert the totals to a formatted string with commas
  expenseTotal.innerHTML = totalExpenses.toLocaleString();
  balance.innerHTML = (totalIncome - totalExpenses).toLocaleString();
}
