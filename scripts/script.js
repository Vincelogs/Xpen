// Define an array to store the transactions
let transactions = [];

// Function to add a new transaction
function addTransaction(description, amount) {
    const transaction = {
        description,
        amount: +amount, // Convert amount to a number
        timestamp: new Date().toISOString()
    };
    transactions.push(transaction);
}

// Function to display transactions in the UI
function displayTransactions() {
    const transactionList = document.createElement('ul');
    transactions.forEach(transaction => {
        const listItem = document.createElement('li');
        listItem.textContent = `${transaction.description}: ${transaction.amount}`;
        transactionList.appendChild(listItem);
    });

    const container = document.querySelector('.container');
    container.appendChild(transactionList);
}

// Example usage:
addTransaction("Salary", 3000);
addTransaction("Rent", -1000);
displayTransactions();
