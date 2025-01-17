const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');  // Import GoogleGenerativeAI

const app = express();
app.use(express.json());

// Hardcoded API key
const apiKey = API_KEY;  // Replace with your actual API key
const genAI = new GoogleGenerativeAI(apiKey);  // Create instance of GoogleGenerativeAI

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",  // Model to be used
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

// Chat function to interact with Gemini API
async function getChatResponse(userMessage) {
  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  const result = await chatSession.sendMessage(userMessage);
  return result.response.text();  // Extract and return the response text
}

// POST endpoint to handle user queries
app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;  // Extract the user message from the request body

  try {
    const responseText = await getChatResponse(userMessage);  // Get response from the model
    res.json({ response: responseText });  // Send the response back to the client
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error communicating with Gemini API' });  // Error handling
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
