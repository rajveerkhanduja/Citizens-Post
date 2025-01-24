const axios = require('axios');
const fs = require('fs');

// Function to fetch pincode data
const getPincodeData = async (pincode) => {
  const options = {
    method: 'GET',
    url: `https://india-pincode-with-latitude-and-longitude.p.rapidapi.com/api/v1/pincode/${pincode}`,
    headers: {
      'x-rapidapi-key': process.env.RAPIDAPI_KEY,
      'x-rapidapi-host': 'india-pincode-with-latitude-and-longitude.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    console.log(`Data for Pincode ${pincode}:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data for Pincode ${pincode}:`, error);
  }
};

// Read JSON file
fs.readFile('consignmentNumber.json', 'utf8', async (err, data) => {
  if (err) {
    console.error('Error reading JSON file:', err);
    return;
  }

  const consignmentData = JSON.parse(data);
  const originPincode = consignmentData.data.consignment.origin_pincode;
  const destinationPincode = consignmentData.data.consignment.destination_pincode;

  // Fetch data for both origin and destination pin codes
  const originData = await getPincodeData(originPincode);
  const destinationData = await getPincodeData(destinationPincode);

  // Extract state and district for both origin and destination
  const extractStateAndDistrict = (data) => {
    if (data && data.length > 0) {
      return {
        state: data[0].state,
        district: data[0].district
      };
    }
    return null;
  };

  const originInfo = extractStateAndDistrict(originData);
  const destinationInfo = extractStateAndDistrict(destinationData);

  // Combine data for further processing or storage
  const locationInfo = {
    origin: originInfo,
    destination: destinationInfo
  };

  // Save location info to location.json
  fs.writeFile('location.json', JSON.stringify(locationInfo, null, 2), (err) => {
    if (err) {
      console.error('Error writing to location.json:', err);
    } else {
      console.log('location.json file has been saved with the state and district information.');
    }
  });
});

