export function showDashboard () {
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
  let myExpensesPieChart = null;

  const expensesData = JSON.parse(localStorage.getItem('expenselist')) || [];

  // function to get total expenses and income
  function getTotals () {
    totalExpenses = parseFloat(localStorage.getItem('totalExpenses')) || 0;
    totalIncome = parseFloat(localStorage.getItem('totalIncome')) || 0;
  }

  // function to create expenses piechart
  function expensesPieChart (expensesData) {
    // Get the canvas element
    const ctx = document.getElementById('expensesPieChart').getContext('2d');

    // Check if there is an existing chart on the canvas
    if (window.myExpensesPieChart) {
      window.myExpensesPieChart.destroy();
    }

    // display a default message if no data is available
    if (!expensesData || expensesData.length === 0) {
      const ctx = document.getElementById('expensesPieChart').getContext('2d');

      ctx.font = 'italic 30px Arial';
      ctx.fillStyle = '#2E4F4F';
      const text = 'No data available';
      const x = 50;
      const y = 150;

      ctx.fillText(text, x, y);
      return;
    }

    // total amount for each category
    const chartData = expensesData.reduce((result, item) => {
      if (!result[item.category]) {
        result[item.category] = 0;
      }
      result[item.category] += item.amount;
      return result;
    }, {});

    const category = Object.keys(chartData);
    const amounts = Object.values(chartData);

    // Create a new chart instance
    window.myExpensesPieChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: category, // An array of category names
        datasets: [
          {
            data: amounts, // An array of corresponding expense values
            backgroundColor: [
              '#FF5733',
              '#FFC300',
              '#FF33E9',
              '#33FF52',
              '#339BFF',
              '#D633FF',
              '#FF3366',
              '#33FF9B',
              '#33A2FF',
              '#F733FF',
              '#FF336B',
              '#33FFEC',
              '#336BFF',
              '#E4FF33'
            ]
          }
        ]
      }
    });
  }

  // Destroy any existing chart instance before loading the chart
  if (window.myExpensesPieChart) {
    window.myExpensesPieChart.destroy();
  }

  // load the chart
  expensesPieChart(expensesData);

  // load existing totals
  getTotals();

  // Convert the totals to a formatted string with commas
  expenseTotal.innerHTML = totalExpenses.toLocaleString();
  balance.innerHTML = (totalIncome - totalExpenses).toLocaleString();
}
