const expenseForm = document.getElementById('expense-form');

expenseForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const amountInput = document.getElementById('amount');
  const descriptionInput = document.getElementById('description');
  const dateInput = document.getElementById('date');

  // Validate user input
  if (amountInput.value === '' || isNaN(amountInput.value) || amountInput.value <= 0) {
    alert('Please enter a valid amount.');
    return;
  }

  // Validate other input fields...

  // If validation passes, proceed to add expense
  addExpense({
    amount: parseFloat(amountInput.value),
    description: descriptionInput.value,
    date: dateInput.value,
    category: categoryInput.value
  });

  // Clear form inputs
  expenseForm.reset();
});

const expenseList = document.getElementById('expense-list');

function addExpense(expense) {
  // Create a new expense item
  const expenseItem = document.createElement('li');
  expenseItem.innerHTML = `
    <strong>${expense.amount}</strong> - ${expense.description} (${expense.date}) - ${expense.category}
  `;

  // Add the expense item to the list
  expenseList.appendChild(expenseItem);
}
