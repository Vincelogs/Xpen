export function showExpenses() {
  const dashboard = document.getElementById('dashboard');
  const expenses = document.getElementById('expenses');
  const income = document.getElementById('income');
  const profile = document.getElementById('profile');

  dashboard.style.display = 'none';
  expenses.style.display = 'block';
  income.style.display = 'none';
  profile.style.display = 'none';
}
