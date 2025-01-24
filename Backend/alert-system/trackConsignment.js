import axios from 'axios';

const encodedParams = new URLSearchParams();
encodedParams.set('consignment_number', 'EU866680950IN');
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

try {
	const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
}