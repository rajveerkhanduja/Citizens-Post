const { GoogleGenerativeAI } = require("@google/generative-ai");
const readline = require('readline');

// Hardcoded API Key
const apiKey = process.env.CHATBOT_API_KEY; // Replace with your actual API key
const genAI = new GoogleGenerativeAI(apiKey);

// Define the model to use (e.g., Gemini 1.5 Flash)
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash", 
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

// Function to create a smart prompt based on user input
function createSmartPrompt(query) {
  return `
  You are an expert in postal services and logistics. Your task is to assist in evaluating and improving postal operations based on various performance metrics and customer satisfaction criteria.
  
  Here is the query: "${query}"
  Provide a detailed, accurate, and insightful response based on best practices and current industry standards.
  `;
}

// Setting up readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Function to handle user input and interact with the model
async function askQuestion() {
  rl.question('Please enter your query about postal services: ', async (userQuery) => {
    // Create a smart prompt based on the user's query
    const smartPrompt = createSmartPrompt(userQuery);

    // Start a chat session
    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [{ text: smartPrompt }],
        },
      ],
    });

    // Send the smart prompt and get the result
    const result = await chatSession.sendMessage(smartPrompt);

    // Log the response text from the AI
    console.log("Response:", result.response.text());
    console.log("\n==============================\n");

    // Close the readline interface after the response
    rl.close();
  });
}

askQuestion(); // Call the function to prompt the user for input
