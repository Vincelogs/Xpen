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
  let listExpenses = [];
  let symbol = '$';

// function to display expenses
  function displayExpenses () {

    // clearing existing content
    expenseList.innerHTML = '';

    if (listExpenses.length === 0) {
      expenseList.innerHTML = '<h2>No Expense Found !</h2>';
    } else {
      listExpenses.forEach((e,index) => {
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
                <button onclick="editExpense(${index})">Edit</button>
                <button onclick="deleteExpense(${index})">Delete</button>
            </div>
        </li>
        `;
      });
    }
  }

  // function to edit an expense
  function editExpense (index) {
  }

  // function to delete an expense
  function deleteExpense (index) {
  }

  // adding an expense
  addExpense.addEventListener('click', (event) => {
    event.preventDefault();

    if (amountInput.value <= 0 || nameInput.value === '' || dateInput.value === '') {
      alert('Please enter a valid value.');
      return;
    }
    let expense = {
      amount: Number(amountInput.value),
      name: nameInput.value,
      date: dateInput.value,
      category: categoryInput.value
    };
    console.log(expense);
    listExpenses.push(expense);
    displayExpenses();
  });

  displayExpenses();
}
