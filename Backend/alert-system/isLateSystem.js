import axios from 'axios';

// Replace with your API keys
const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_KEY;
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

// Function to get travel time with traffic info
async function getTravelTimeWithTraffic(origin, destination, apiKey) {
  const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&departure_time=now&traffic_model=best_guess&key=${apiKey}`;

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
      } else {
        console.log("No significant delay detected.");
      }
    } else {
      console.log("Error in Google Maps API response:", data.status);
    }
  } catch (error) {
    console.error("Error in getting travel time:", error.message);
  }
}

// Function to check weather along the route using WeatherAPI
async function checkWeather(city, apiKey) {
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

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
      } else {
        console.log(`Weather is clear in ${location}.`);
      }
    } else {
      console.log("Weather data not available.");
    }
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
  }
}

// Main function to predict delays due to traffic and weather
async function predictDelay(origin, destination) {
  console.log(`Checking traffic and weather for the route from ${origin} to ${destination}...`);

  // Check traffic conditions (delay prediction)
  await getTravelTimeWithTraffic(origin, destination, GOOGLE_MAPS_API_KEY);

  // Check weather conditions at origin and destination
  await checkWeather(origin, WEATHER_API_KEY);
  await checkWeather(destination, WEATHER_API_KEY);
}

// Example usage
const origin = "Hyderabad, India";
const destination = "Chennai, India";
predictDelay(origin, destination);
