const axios = require('axios');
const fs = require('fs').promises;
const twilio = require('twilio');

// Use environment variables for sensitive data
const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_KEY;
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER; // Twilio sender phone number
const RECIPIENT_PHONE_NUMBER = process.env.RECIPIENT_PHONE_NUMBER; // Recipient's phone number
const CONSIGNMENT_NUMBER = process.env.CONSIGNMENT_NUMBER;

// Initialize Twilio client
const twilioClient = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

// Function to fetch consignment data and save to JSON file
const fetchAndStoreConsignmentData = async () => {
  const encodedParams = new URLSearchParams();
  encodedParams.set('consignment_number', CONSIGNMENT_NUMBER);
  encodedParams.set('include_pincode_info', 'false');

  const options = {
    method: 'POST',
    url: 'https://speedpost-tracking-api-for-india-post.p.rapidapi.com/track/consignment',
    headers: {
      'x-rapidapi-key': RAPIDAPI_KEY,
      'x-rapidapi-host': 'speedpost-tracking-api-for-india-post.p.rapidapi.com',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: encodedParams,
  };

  try {
    const response = await axios.request(options);
    await fs.writeFile('consignmentNumber.json', JSON.stringify(response.data, null, 2));
    console.log('Consignment data has been saved to consignmentNumber.json');
  } catch (error) {
    console.error('Error fetching consignment data:', error);
  }
};

// Function to fetch pincode data
const getPincodeData = async (pincode) => {
  const options = {
    method: 'GET',
    url: `https://india-pincode-with-latitude-and-longitude.p.rapidapi.com/api/v1/pincode/${pincode}`,
    headers: {
      'x-rapidapi-key': RAPIDAPI_KEY,
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

// Function to fetch JSON data
async function fetchJSON(file) {
  const data = await fs.readFile(file, 'utf-8');
  return JSON.parse(data);
}

// Function to categorize delivery
async function categorizeDelivery({
  fromState,
  fromDistrict,
  toState,
  toDistrict,
  deliveryType
}) {
  const deliveryData = await fetchJSON('CitizenCharterDaysData.json');
  const metroAndCapitalData = await fetchJSON('CitizenCharterMetroAndCapitalData.json');

  const deliveryCategory = deliveryData.Delivery[deliveryType];
  let category;
  let days;

  if (
    metroAndCapitalData.MetroCities.includes(fromDistrict) &&
    metroAndCapitalData.MetroCities.includes(toDistrict)
  ) {
    category = "Metro to Metro";
    days = deliveryCategory.MetroToMetro;
  } else if (
    metroAndCapitalData.StateCapitals.includes(fromDistrict) &&
    metroAndCapitalData.StateCapitals.includes(toDistrict)
  ) {
    category = "State Capital to State Capital";
    days = deliveryCategory.StateCapitalToStateCapital;
  } else if (fromState !== toState) {
    category = "Rest of Country";
    days = deliveryCategory.RestOfCountry;
  } else if (fromDistrict !== toDistrict) {
    category = "Same State";
    days = deliveryCategory.SameState;
  } else {
    category = "Local";
    days = deliveryCategory.Local;
  }

  return { category, days };
}

// Function to get travel time with traffic info
async function getTravelTimeWithTraffic(origin, destination) {
  const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&departure_time=now&traffic_model=best_guess&key=${GOOGLE_MAPS_API_KEY}`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    if (data.status === 'OK') {
      const durationInTraffic = data.routes[0].legs[0].duration_in_traffic.text;
      const duration = data.routes[0].legs[0].duration.text;

      console.log(`Estimated travel time with traffic: ${durationInTraffic}`);
      console.log(`Estimated travel time without traffic: ${duration}`);

      // Detect delay due to traffic
      if (durationInTraffic !== duration) {
        console.log("There is a delay due to traffic.");
        return durationInTraffic;
      } else {
        console.log("No significant delay detected.");
        return duration;
      }
    } else {
      console.log("Error in Google Maps API response:", data.status);
    }
  } catch (error) {
    console.error("Error in getting travel time:", error.message);
  }
}

// Function to check weather along the route using WeatherAPI
async function checkWeather(city) {
  const url = `https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${city}&aqi=no`;

  try {
    const response = await axios.get(url);
    const weatherData = response.data;

    if (weatherData) {
      const location = weatherData.location.name;
      const temperature = weatherData.current.temp_c;
      const condition = weatherData.current.condition.text;
      const windSpeed = weatherData.current.wind_kph;

      console.log(`Weather in ${location}: ${condition}, ${temperature}°C`);
      console.log(`Wind Speed: ${windSpeed} km/h`);

      // If the weather is bad (rain, snow, storm), flag as potential delays
      if (condition.toLowerCase().includes('rain') || condition.toLowerCase().includes('storm') || condition.toLowerCase().includes('snow')) {
        console.log(`Weather conditions in ${location} could cause delays.`);
        return true; // Weather delay expected
      } else {
        console.log(`Weather is clear in ${location}.`);
        return false; // No weather delay
      }
    } else {
      console.log("Weather data not available.");
    }
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
  }
}

// Function to send SMS using Twilio
async function sendSMS(messageBody) {
  try {
    const message = await twilioClient.messages.create({
      body: messageBody,
      from: TWILIO_PHONE_NUMBER,
      to: RECIPIENT_PHONE_NUMBER
    });

    console.log('Message sent successfully!');
    console.log('Message SID:', message.sid);
    console.log('Status:', message.status);
  } catch (error) {
    console.error('Error sending SMS:', error);

    // Detailed error handling
    if (error.code) {
      switch (error.code) {
        case 20003:
          console.error('Authentication failed. Check your Account SID and Auth Token.');
          break;
        case 21211:
          console.error('Invalid "To" phone number.');
          break;
        case 21214:
          console.error('Invalid "From" phone number.');
          break;
        default:
          console.error(`Twilio Error Code: ${error.code}`);
      }
    }
  }
}

// Main function to read location data, categorize delivery, predict delays, and send SMS
async function main() {
  // The main logic remains the same as before
}

// Run the main function
main();
