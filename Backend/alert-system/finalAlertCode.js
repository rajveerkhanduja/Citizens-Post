import axios from 'axios';
import fs from 'fs/promises';
import twilio from 'twilio';
import path from 'path';

// Logging utility function
function log(message) {
  console.log(`[${new Date().toISOString()}] ${message}`);
}

// Hardcoded Credentials (FOR HACKATHON USE ONLY - NOT RECOMMENDED FOR PRODUCTION)
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_PHONE_NUMBER = process.env.TWILIO_NUMBER;
const RECIPIENT_PHONE_NUMBER = process.env.RECIPIENT_NUMBER;
const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAP_KEY;
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const RAPIDAPI_SPEEDPOST_KEY = process.env.RAPIDAPI_SPEEDPOST_KEY;
const RAPIDAPI_PINCODE_KEY = process.env.RAPIDAPI_PINCODE_KEY;

// Initialize Twilio client
const twilioClient = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

// Consignment Details API Function with JSON File Saving
const getConsignmentDetailsFromAPI = async (consignmentNumber) => {
  log(`Starting getConsignmentDetailsFromAPI for ${consignmentNumber}`);
  
  const encodedParams = new URLSearchParams();
  encodedParams.set('consignment_number', consignmentNumber);
  encodedParams.set('include_pincode_info', 'false');

  const options = {
    method: 'POST',
    url: 'https://speedpost-tracking-api-for-india-post.p.rapidapi.com/track/consignment',
    headers: {
      'x-rapidapi-key': RAPIDAPI_SPEEDPOST_KEY,
      'x-rapidapi-host': 'speedpost-tracking-api-for-india-post.p.rapidapi.com',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: encodedParams,
  };

  try {
    log('Sending request to SpeedPost API');
    const response = await axios.request(options);
    log('Received response from SpeedPost API');
    
    const { success, message, data } = response.data;

    if (success) {
      const consignmentData = {
        success: success,
        message: message,
        data: {
          tracking_status: data.tracking_status,
          synced_at: data.synced_at,
          tracking_events: data.tracking_events,
          consignment: {
            number: data.consignment.number,
            article_type: data.consignment.article_type,
            delivery_status: data.consignment.delivery_status,
            substatus: data.consignment.substatus,
            booked_at: data.consignment.booked_at,
            booked_on: data.consignment.booked_on,
            origin_pincode: data.consignment.origin_pincode,
            destination_pincode: data.consignment.destination_pincode,
            delivery_location: data.consignment.delivery_location,
            delivered_at: data.consignment.delivered_at,
            last_updated_at: data.consignment.last_updated_at,
            tariff: data.consignment.tariff,
            synced_at: data.consignment.synced_at,
            current_status: data.consignment.current_status,
            transit_duration: data.consignment.transit_duration
          }
        }
      };

      // Save the consignment details to a JSON file
      try {
        const filePath = path.join(process.cwd(), 'consignmentDetails.json');
        await fs.writeFile(filePath, JSON.stringify(consignmentData, null, 2), 'utf-8');
        log(`Consignment details saved to ${filePath}`);
      } catch (fileError) {
        log(`Error saving consignment details to file: ${fileError.message}`);
      }

      return consignmentData;
    } else {
      log('Consignment not found');
      return null;
    }
  } catch (error) {
    log(`Error fetching consignment details: ${error.message}`);
    if (error.response) {
      log(`Response data: ${JSON.stringify(error.response.data)}`);
      log(`Response status: ${error.response.status}`);
      log(`Response headers: ${JSON.stringify(error.response.headers)}`);
    }
    return null;
  }
};

// Pincode Details
async function fetchPincodeDetails(pincode) {
  log(`Fetching pincode details for ${pincode}`);
  const options = {
    method: 'GET',
    url: `https://india-pincode-with-latitude-and-longitude.p.rapidapi.com/api/v1/pincode/${pincode}`,
    headers: {
      'x-rapidapi-key': RAPIDAPI_PINCODE_KEY,
      'x-rapidapi-host': 'india-pincode-with-latitude-and-longitude.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    log(`Pincode details retrieved for ${pincode}`);
    return response.data;
  } catch (error) {
    log(`Error fetching pincode details: ${error.message}`);
    return null;
  }
}

// JSON File Reader with Error Handling
async function fetchJSON(file) {
  log(`Attempting to read JSON file: ${file}`);
  try {
    const data = await fs.readFile(file, 'utf-8');
    log(`Successfully read ${file}`);
    return JSON.parse(data);
  } catch (error) {
    log(`Error reading ${file}: ${error.message}`);
    throw error;
  }
}

// Main Prediction and Alert Function
async function predictDelayAndSendSMS(consignmentNumber) {
  log(`Starting predictDelayAndSendSMS for ${consignmentNumber}`);

  try {
    // Get consignment details
    const consignmentDetails = await getConsignmentDetailsFromAPI(consignmentNumber);
    if (!consignmentDetails) {
      log('Consignment details could not be retrieved');
      return null;
    }

    log('Consignment details retrieved successfully');

    // Generate a simple message based on the consignment status
    const messageBody = `Consignment ${consignmentNumber} is currently ${consignmentDetails.data.consignment.current_status}. Transit duration: ${consignmentDetails.data.consignment.transit_duration}`;

    log(`Prepared message: ${messageBody}`);

    // Send SMS with the status
    log('Attempting to send SMS');
    const smsSent = await sendSMS(messageBody);
    
    log('Process completed');
    return {
      consignmentNumber,
      messageBody,
      smsSent
    };

  } catch (error) {
    log(`Prediction and SMS process failed: ${error.message}`);
    return null;
  }
}

// SMS Sender with Enhanced Error Handling
async function sendSMS(statusMessage) {
  log('Attempting to send SMS');
  try {
    const message = await twilioClient.messages.create({
      body: statusMessage,
      from: TWILIO_PHONE_NUMBER,
      to: RECIPIENT_PHONE_NUMBER,
    });

    log('SMS sent successfully');
    log(`Message SID: ${message.sid}`);
    log(`Status: ${message.status}`);
    return true;
  } catch (error) {
    log(`Error sending SMS: ${error.message}`);
    return false;
  }
}

// Example usage with error handling
async function main() {
  log('Starting main function');
  try {
    const consignmentNumber = "CG180864439IN"; // Example consignment number
    log(`Processing consignment: ${consignmentNumber}`);
    await predictDelayAndSendSMS(consignmentNumber);
    log('Main function completed');
  } catch (error) {
    log(`Main process failed: ${error.message}`);
  }
}

// Only run main if this is the direct script being executed
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { 
  predictDelayAndSendSMS, 
  getConsignmentDetailsFromAPI
};