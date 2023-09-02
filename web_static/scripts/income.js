export function showIncome() {
  const dashboard = document.getElementById('dashboard');
  const expenses = document.getElementById('expenses');
  const income = document.getElementById('income');
  const profile = document.getElementById('profile');

  dashboard.style.display = 'none';
  expenses.style.display = 'none';
  income.style.display = 'block';
  profile.style.display = 'none';
}
