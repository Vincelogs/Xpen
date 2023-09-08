export function showExpenses () {
  const dashboard = document.getElementById('dashboard');
  const expenses = document.getElementById('expenses');
  const income = document.getElementById('income');
  const profile = document.getElementById('profile');

  dashboard.style.display = 'none';
  expenses.style.display = 'block';
  income.style.display = 'none';
  profile.style.display = 'none';

  const expenseList = document.getElementById('expense-transactions');
  const addExpense = document.getElementById('addExpense');
  const amountInput = document.getElementById('amount');
  const nameInput = document.getElementById('name');
  const dateInput = document.getElementById('date');
  const categoryInput = document.getElementById('category');
  const cancelEdit = document.getElementById('cancelEdit');
  let listExpenses = [];
  let totalExpenses = 0;
  const symbol = '$';
  let editIndex = -1;

  // Function to display expenses
  function displayExpenses (listExpenses) {
    totalExpenses = listExpenses.reduce((total, currentExpense) => {
      return total + currentExpense.amount;
    }, 0);

    // Clear existing content
    expenseList.innerHTML = '';

    if (listExpenses.length === 0) {
      expenseList.innerHTML = '<h2>No expenses recorded yet.</h2>';
    } else {
      listExpenses.forEach((e, index) => {
        expenseList.innerHTML += `
          <li class="expense-transactions">
              <p>${e.category}</p>
              <div>
                  <p>${e.name}</p>
              </div>
              <div>
                  <p>${e.date}</p>
              </div>
              <div class="content-right">
                  <p>${symbol}${e.amount}</p>
                  <button data-id="${index}">Edit</button>
                  <button data-id="${index}">Delete</button>
              </div>
          </li>
        `;
      });
    }
    // save expense data after displaying
    saveExpenses();
  }

  // Function to edit an expense
  function editExpense (dataIndex) {
    editIndex = dataIndex;
    if (listExpenses.length === 0 || dataIndex < 0 || dataIndex >= listExpenses.length) {
      console.log('No expenses to edit');
      return;
    }
    console.log(`Attempting to edit expense at index ${dataIndex}`);

    // populate form fields with expense data
    amountInput.value = listExpenses[dataIndex].amount;
    nameInput.value = listExpenses[dataIndex].name;
    dateInput.value = listExpenses[dataIndex].date;
    categoryInput.value = listExpenses[dataIndex].category;

    // display button to cancel an edit
    cancelEdit.style.display = 'block';
  }

  // Function to delete an expense
  function deleteExpense (dataIndex) {
    console.log(`Attempting to delete expense at index ${dataIndex}`);
    listExpenses = listExpenses.filter((e, idx) => idx !== dataIndex);
    displayExpenses(listExpenses);
  }

  // Function to clear input fields
  function clearInputs () {
    amountInput.value = '';
    nameInput.value = '';
    dateInput.value = '';
    categoryInput.value = '';
  }

  // function to store the Expense data
  function saveExpenses () {
    localStorage.setItem('totalExpenses', totalExpenses);
    localStorage.setItem('expenselist', JSON.stringify(listExpenses));
  }

  // function to get the saved data
  function getExpenses () {
    const storedExpenses = localStorage.getItem('expenselist');
    listExpenses = storedExpenses ? JSON.parse(storedExpenses) : [];
  }

  // Event delegation for "Edit" and "Delete" buttons
  expenseList.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
      const dataIndex = event.target.getAttribute('data-id');
      if (dataIndex !== null) {
        const expenseIndex = parseInt(dataIndex);
        if (event.target.textContent === 'Edit') {
          editExpense(expenseIndex);
        } else if (event.target.textContent === 'Delete') {
          deleteExpense(expenseIndex);
        }
      }
    }
  });

  // Event to cancel edit and reset fields
  cancelEdit.addEventListener('click', () => {
    editIndex = -1;
    amountInput.value = '';
    nameInput.value = '';
    dateInput.value = '';
    categoryInput.value = '';

    // Hide the cancelEdit button
    cancelEdit.style.display = 'none';
  });

  // Event listener for adding and editing an expense
  addExpense.addEventListener('click', (event) => {
    event.preventDefault();

    // Get input values
    const amountValue = Number(amountInput.value);
    const nameValue = nameInput.value.trim(); // Remove leading/trailing spaces
    const dateValue = dateInput.value.trim(); // Remove leading/trailing spaces
    const categoryValue = categoryInput.value.trim(); // Remove leading/trailing spaces

    //Check if any input is empty or amount is not a positive number
    if (
      amountValue <= 0 ||
      nameValue === '' ||
      dateValue === '' ||
      categoryValue === ''
    ) {
      alert('Please enter valid values.');
      return;
    }

    // Create an expense object
    const expense = {
      amount: amountValue,
      name: nameValue,
      date: dateValue,
      category: categoryValue
    };

    // If editIndex is -1, it means we are adding a new expense
    if (editIndex === -1) {
      listExpenses.push(expense);
    } else {
      // If editIndex is not -1, we are editing an existing expense
      listExpenses[editIndex] = expense;
    }

    // Reset editIndex
    editIndex = -1;

    console.log(expense);

    // Update the expense list
    displayExpenses(listExpenses);

    // Hide the cancelEdit button
    cancelEdit.style.display = 'none';

    // Clear input fields after adding/editing an expense
    clearInputs();
  });

  // load existing expenses
  getExpenses();

  // Initial display of expenses
  displayExpenses(listExpenses);
}
