import axios from 'axios';
import fs from 'fs/promises';
import path from 'path';
import env from "dotenv";

env.config()


const encodedParams = new URLSearchParams();
encodedParams.set('consignment_number', 'CG180864439IN');
encodedParams.set('include_pincode_info', 'false');

const options = {
  method: 'POST',
  url: 'https://speedpost-tracking-api-for-india-post.p.rapidapi.com/track/consignment',
  headers: {
    'x-rapidapi-key': process.env.RAPIDAPI_KEY,
    'x-rapidapi-host': 'speedpost-tracking-api-for-india-post.p.rapidapi.com',
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  data: encodedParams,
};

async function trackConsignment() {
  try {
    const response = await axios.request(options);
    
    // Convert response to JSON and write to file
    const outputPath = path.join(process.cwd(), 'consignmentValue.json');
    await fs.writeFile(outputPath, JSON.stringify(response.data, null, 2));
    
    console.log('Tracking data saved to consignmentValue.json');
    console.log(response.data);
  } catch (error) {
    console.error('Error tracking consignment:', error);
    
    // If there's an error, write error details to the JSON file
    const outputPath = path.join(process.cwd(), 'consignmentValue.json');
    await fs.writeFile(outputPath, JSON.stringify({ error: error.message }, null, 2));
  }
}

trackConsignment();