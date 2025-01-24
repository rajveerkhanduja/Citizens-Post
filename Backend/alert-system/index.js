document.getElementById('trackButton').addEventListener('click', function(event) {
    event.preventDefault();
    
    const consignmentNumber = document.getElementById('consignmentNumber').value;
    
    // Call the AlertCreation function with the consignment number
    AlertCreation.fetchAndStoreConsignmentData(consignmentNumber)
      .then(() => {
        // Display a success message
        const resultArea = document.getElementById('resultArea');
        resultArea.innerHTML = '<p>Consignment data fetched and stored successfully!</p>';
      })
      .catch(error => {
        // Display an error message
        const resultArea = document.getElementById('resultArea');
        resultArea.innerHTML = '<p>Error: ' + error.message + '</p>';
      });
  });