const accountSid = 'AC6b91d6dfbdc4d5ce8d2790713773e02e';
const authToken = '7a48a66dbd118969d9d48dd68b3182c2';
const client = require('twilio')(accountSid, authToken);

async function sendSMS() {
  try {
    const message = await client.messages.create({
      body: 'Hello from Twilio SMS API!', // Customize your message here
      from: '+13613013217',
      to: '+919673439721'
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

// Run the SMS sending function
sendSMS();