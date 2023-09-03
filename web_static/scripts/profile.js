export function showProfile() {
  const dashboard = document.getElementById('dashboard');
  const expenses = document.getElementById('expenses');
  const income = document.getElementById('income');
  const profile = document.getElementById('profile');

  dashboard.style.display = 'none';
  expenses.style.display = 'none';
  income.style.display = 'none';
  profile.style.display = 'block';
}
