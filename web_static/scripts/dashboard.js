export function showDashboard() {
  const dashboard = document.getElementById('dashboard');
  const expenses = document.getElementById('expenses');
  const profile = document.getElementById('profile');

  dashboard.style.display = 'block';
  expenses.style.display = 'none';
  profile.style.display = 'none';
}
