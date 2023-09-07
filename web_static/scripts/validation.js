// Function to validate form input
function validateForm(description, amount) {
    const errors = [];
  
    if (!description) {
      errors.push('Description is required.');
    }
  
    if (isNaN(amount) || parseFloat(amount) <= 0) {
      errors.push('Amount must be a positive number.');
    }
  
    return errors;
  }
  
  export { validateForm };
  