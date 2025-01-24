const express = require('express');
const axios = require('axios');
const fs = require('fs').promises;
const twilio = require('twilio');
const cors = require('cors'); // Import CORS package

// API keys from environment variables
const { GOOGLE_MAPS_KEY, WEATHER_API_KEY, RAPIDAPI_KEY, TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } = process.env;

// Initialize Twilio client
const twilioClient = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

// Create an Express server
const app = express();
app.use(cors()); // Enable CORS for all origins
app.use(express.json()); // Middleware to parse JSON request bodies

// Helper function: Fetch consignment data and save to JSON
const fetchAndStoreConsignmentData = async (consignmentNumber) => {
  try {
    const params = new URLSearchParams({ consignment_number: consignmentNumber, include_pincode_info: 'false' });
    const options = {
      method: 'POST',
      url: 'https://speedpost-tracking-api-for-india-post.p.rapidapi.com/track/consignment',
      headers: {
        'x-rapidapi-key': RAPIDAPI_KEY,
        'x-rapidapi-host': 'speedpost-tracking-api-for-india-post.p.rapidapi.com',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: params,
    };

    const response = await axios.request(options);
    await fs.writeFile('consignmentNumber.json', JSON.stringify(response.data, null, 2));
    console.log('Consignment data saved to consignmentNumber.json');
  } catch (error) {
    console.error('Error fetching consignment data:', error.message);
  }
};

// Helper function: Fetch pincode data
const getPincodeData = async (pincode) => {
  try {
    const options = {
      method: 'GET',
      url: `https://india-pincode-with-latitude-and-longitude.p.rapidapi.com/api/v1/pincode/${pincode}`,
      headers: {
        'x-rapidapi-key': RAPIDAPI_KEY,
        'x-rapidapi-host': 'india-pincode-with-latitude-and-longitude.p.rapidapi.com',
      },
    };

    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data for Pincode ${pincode}:`, error.message);
  }
};

// Helper function: Categorize delivery based on location
const categorizeDelivery = async (from, to, deliveryType) => {
  const deliveryData = await fs.readFile('CitizenCharterDaysData.json', 'utf8').then(JSON.parse);
  const metroData = await fs.readFile('CitizenCharterMetroAndCapitalData.json', 'utf8').then(JSON.parse);

  const categoryData = deliveryData.Delivery[deliveryType];
  if (metroData.MetroCities.includes(from.district) && metroData.MetroCities.includes(to.district)) {
    return { category: 'Metro to Metro', days: categoryData.MetroToMetro };
  } else if (metroData.StateCapitals.includes(from.district) && metroData.StateCapitals.includes(to.district)) {
    return { category: 'State Capital to State Capital', days: categoryData.StateCapitalToStateCapital };
  } else if (from.state !== to.state) {
    return { category: 'Rest of Country', days: categoryData.RestOfCountry };
  } else if (from.district !== to.district) {
    return { category: 'Same State', days: categoryData.SameState };
  } else {
    return { category: 'Local', days: categoryData.Local };
  }
};

// Helper function: Get travel time and detect traffic delay
const getTravelTimeWithTraffic = async (origin, destination) => {
  try {
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&departure_time=now&traffic_model=best_guess&key=${GOOGLE_MAPS_KEY}`;
    const response = await axios.get(url);

    const leg = response.data.routes[0]?.legs[0];
    if (leg) {
      const delay = leg.duration_in_traffic.text !== leg.duration.text;
      return { time: leg.duration_in_traffic.text, delay };
    }
    return { time: null, delay: false };
  } catch (error) {
    console.error('Error fetching travel time:', error.message);
  }
};

// Helper function: Check weather at a location
const checkWeather = async (location) => {
  try {
    const url = `https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${location}`;
    const { data } = await axios.get(url);

    const condition = data.current.condition.text.toLowerCase();
    const delay = ['rain', 'storm', 'snow'].some((term) => condition.includes(term));
    return { condition, delay };
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
  }
};

// Helper function: Send SMS via Twilio
const sendSMS = async (message) => {
  try {
    const msg = await twilioClient.messages.create({
      body: message,
      from: '+13613013217',
      to: '+919673439721',
    });
    console.log('SMS sent successfully:', msg.sid);
  } catch (error) {
    console.error('Error sending SMS:', error.message);
  }
};

// Endpoint: Handle consignment tracking and delivery categorization
app.post('/track', async (req, res) => {
  try {
    const { consignmentNumber } = req.body;
    if (!consignmentNumber) return res.status(400).send('Consignment number is required.');

    // Fetch and save consignment data
    await fetchAndStoreConsignmentData(consignmentNumber);
    const consignmentData = JSON.parse(await fs.readFile('consignmentNumber.json', 'utf8'));

    // Extract and fetch location data
    const { origin_pincode: origin, destination_pincode: destination } = consignmentData.data.consignment;
    const [originData, destinationData] = await Promise.all([getPincodeData(origin), getPincodeData(destination)]);

    const deliveryCategory = await categorizeDelivery(originData[0], destinationData[0], 'RegisteredLetter');

    // Detect delays (traffic and weather)
    const traffic = await getTravelTimeWithTraffic(origin, destination);
    const weather = [await checkWeather(origin), await checkWeather(destination)];

    // Combine and save results
    const result = { deliveryCategory, traffic, weather };
    await fs.writeFile('parcelCategory.json', JSON.stringify(result, null, 2));

    // Send result via SMS
    await sendSMS(JSON.stringify(result, null, 2));

    res.status(200).send('Consignment tracked and categorized successfully.');
  } catch (error) {
    console.error('Error processing request:', error.message);
    res.status(500).send('An error occurred.');
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
