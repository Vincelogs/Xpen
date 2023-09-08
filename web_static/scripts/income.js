export function showIncome () {
  const dashboard = document.getElementById('dashboard');
  const expenses = document.getElementById('expenses');
  const income = document.getElementById('income');
  const profile = document.getElementById('profile');

  dashboard.style.display = 'none';
  expenses.style.display = 'none';
  income.style.display = 'block';
  profile.style.display = 'none';

  const incomeList = document.getElementById('income-transactions');
  const addIncome = document.getElementById('addIncome');
  const amountInput = document.getElementById('income-amount');
  const nameInput = document.getElementById('incometype');
  const cancel = document.getElementById('cancel');
  let listIncome = [];
  let totalIncome = 0;
  const symbol = '$';
  let editIdx = -1;

  // Function to display income
  function displayIncome (listIncome) {
    totalIncome = listIncome.reduce((totalIncome, currentIncome) => {
      return totalIncome + currentIncome.amount;
    }, 0);

    // Clear existing content
    incomeList.innerHTML = '';

    if (listIncome.length === 0) {
      incomeList.innerHTML = '<h2>No income recorded yet.</h2>';
    } else {
      listIncome.forEach((i, index) => {
        incomeList.innerHTML += `
          <li class="income-transactions">
              <p>${i.name}</p>
              <div class="content-right">
                  <p>${symbol}${i.amount}</p>
                  <button data-id="${index}">Edit</button>
                  <button data-id="${index}">Delete</button>
              </div>
          </li>
        `;
      });
    }
    // save income data after displaying
    saveIncome();
  }

  // Function to edit an income
  function editIncome (dataIdx) {
    editIdx = dataIdx;
    if (listIncome.length === 0 || dataIdx < 0 || dataIdx >= listIncome.length) {
      console.log('No income to edit');
      return;
    }
    console.log(`Attempting to edit income at index ${dataIdx}`);

    // populate form fields with income data
    nameInput.value = listIncome[dataIdx].name;
    amountInput.value = listIncome[dataIdx].amount;

    // display button to cancel an edit
    cancel.style.display = 'block';
  }

  // Function to delete an income
  function deleteIncome (dataIdx) {
    console.log(`Attempting to delete income at index ${dataIdx}`);
    listIncome = listIncome.filter((i, idx) => idx !== dataIdx);
    displayIncome(listIncome);
  }

  // Function to clear input fields
  function clearInputs () {
    nameInput.value = '';
    amountInput.value = '';
  }

  // function to store the income data
  function saveIncome () {
    localStorage.setItem('totalIncome', totalIncome);
    localStorage.setItem('incomelist', JSON.stringify(listIncome));
  }

  // function to get the saved data
  function getIncome () {
    const storedIncome = localStorage.getItem('incomelist');
    listIncome = storedIncome ? JSON.parse(storedIncome) : [];
  }

  // Event delegation for "Edit" and "Delete" buttons
  incomeList.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
      const dataIdx = event.target.getAttribute('data-id');
      if (dataIdx !== null) {
        const incomeIdx = parseInt(dataIdx);
        if (event.target.textContent === 'Edit') {
          editIncome(incomeIdx);
        } else if (event.target.textContent === 'Delete') {
          deleteIncome(incomeIdx);
        }
      }
    }
  });

  // Event to cancel edit and reset fields
  cancel.addEventListener('click', () => {
    editIdx = -1;
    nameInput.value = '';
    amountInput.value = '';

    // Hide the cancel button
    cancel.style.display = 'none';
  });

  // Event listener for adding and editing an income
  addIncome.addEventListener('click', (event) => {
    event.preventDefault();

    // Get input values
    const nameValue = nameInput.value.trim(); // Remove leading/trailing spaces
    const amountValue = Number(amountInput.value);

    // Check if any input is empty or amount is not a positive number
    if (amountValue <= 0 || nameValue === '') {
      alert('Please enter valid values.');
      return;
    }

    // Create an income object
    const income = {
      name: nameValue,
      amount: amountValue
    };

    // If editIndex is -1, it means we are adding a new income
    if (editIdx === -1) {
      listIncome.push(income);
    } else {
      // If editIndex is not -1, we are editing an existing income
      listIncome[editIdx] = income;
    }

    // Reset editIndex
    editIdx = -1;

    console.log(income);

    // Update the income list
    displayIncome(listIncome);

    // Hide the cancel button
    cancel.style.display = 'none';

    // Clear input fields after adding/editing an income
    clearInputs();
  });

  // load existing income
  getIncome();

  // Initial display of income
  displayIncome(listIncome);
}
