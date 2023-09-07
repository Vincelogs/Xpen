// api.js

// Function to send data to the server
async function saveDataToServer(description, amount) {
    try {
      // Construct a request object with necessary data
      const requestData = {
        description: description,
        amount: parseFloat(amount),
      };
  
      // Send a POST request to your server API
      const response = await fetch('/api/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to save data on the server.');
      }
  
      // Return a success message or other relevant data from the server
      return response.json();
    } catch (error) {
      // Handle errors gracefully
      console.error('Error saving data:', error.message);
      throw error;
    }
  }
  
  // Function to fetch data from the server
  async function fetchDataFromServer() {
    try {
      // Send a GET request to your server API
      const response = await fetch('/api/data');
  
      if (!response.ok) {
        throw new Error('Failed to fetch data from the server.');
      }
  
      // Return data fetched from the server
      return response.json();
    } catch (error) {
      // Handle errors gracefully
      console.error('Error fetching data:', error.message);
      throw error;
    }
  }
  
  export { saveDataToServer, fetchDataFromServer };
  