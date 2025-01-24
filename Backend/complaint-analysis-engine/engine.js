import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import fetch from 'node-fetch'; // Using 'import' for fetch

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to fetch complaints from Firestore
async function getComplaints() {
  const complaintsCollection = collection(db, "complaints");
  const querySnapshot = await getDocs(complaintsCollection);

  const complaints = [];
  querySnapshot.forEach((doc) => {
    complaints.push(doc.data());
  });

  return complaints;
}

// Function to create a Gemini prompt from complaints data
function createGeminiPrompt(complaints) {
  let prompt = "Below are the complaints received by the Department of Posts (DoP). Please analyze these complaints and provide actionable pointers for the officials to resolve them in JSON format:\n\n";

  complaints.forEach((complaint, index) => {
    prompt += `Complaint ${index + 1}:\n`;
    prompt += `Category: ${complaint.category}\n`;
    prompt += `Description: ${complaint.description}\n`;
    prompt += `Location: ${complaint.city}, ${complaint.state}, ${complaint.country}\n\n`;
  });

  prompt += "\nAdditionally, please analyze the complaints data and create alerts with detailed notifications in the following JSON structure:\n";
  prompt += `{
    "alerts": [
      {
        "priority": "High/Medium/Low",
        "description": "Detailed explanation of the alert",
        "suggestedAction": "Recommended steps to address the alert",
        "affectedRegions": ["City, State, Country"]
      }
    ]
  }\n\n`;

  prompt += "Please respond with the entire analysis, including complaints resolutions and alerts, strictly in JSON format. Do not include any text outside the JSON structure.";
  return prompt;
}

// Function to send the prompt to Gemini API using fetch and get response
async function getGeminiResponse(prompt) {
  const apiKey = 'AIzaSyCbHzSnLKtanbjek-_g1qDCoAfkcMSY6ac';  // Gemini API key
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

  const data = {
    contents: [
      {
        parts: [
          {
            text: prompt
          }
        ]
      }
    ]
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  const responseData = await response.json();
  return responseData;
}

// Function to analyze complaints and provide actionable solutions
async function analyzeComplaints() {
  try {
    // Fetch complaints from Firebase Firestore
    const complaints = await getComplaints();

    // Create a Gemini prompt
    const prompt = createGeminiPrompt(complaints);

    // Send the prompt to Gemini and get the response
    const geminiResponse = await getGeminiResponse(prompt);

    // Handle the suggestions and display actionable pointers
    if (geminiResponse && geminiResponse.candidates && geminiResponse.candidates.length > 0) {
      const suggestions = geminiResponse.candidates[0].content.parts[0].text; // Correctly extract text

      if (suggestions) {
        console.log("Suggestions from Gemini:\n");
        console.log(suggestions); // Display the suggestions as they are
      } else {
        console.log("No suggestions found in the Gemini response.");
      }
    } else {
      console.log("No candidates found in the Gemini response.");
    }

    // Analyze patterns in the complaints data
    analyzePatterns(complaints);

  } catch (error) {
    console.error("Error analyzing complaints:", error);
  }
}

// Function to analyze patterns from the complaints data
function analyzePatterns(complaints) {
  const locationCounts = {};
  const categoryCounts = {};
  const similarComplaints = [];

  complaints.forEach(complaint => {
    // Track locations
    const locationKey = `${complaint.city}, ${complaint.state}`;
    locationCounts[locationKey] = (locationCounts[locationKey] || 0) + 1;

    // Track categories
    categoryCounts[complaint.category] = (categoryCounts[complaint.category] || 0) + 1;

    // Identify similar complaints based on category and description keywords
    const complaintSummary = `${complaint.category}:${complaint.description.substring(0, 50)}`; // First 50 characters for similarity check
    similarComplaints.push(complaintSummary);
  });

  // Log pattern analysis results
  console.log("Pattern Analysis:");

  console.log("\nLocation Counts:");
  for (let location in locationCounts) {
    console.log(`${location}: ${locationCounts[location]} complaints`);
  }

  console.log("\nCategory Counts:");
  for (let category in categoryCounts) {
    console.log(`${category}: ${categoryCounts[category]} complaints`);
  }

  console.log("\nSimilar Complaints:");
  const complaintGroups = {};
  similarComplaints.forEach((complaint) => {
    complaintGroups[complaint] = (complaintGroups[complaint] || 0) + 1;
  });

  for (let group in complaintGroups) {
    if (complaintGroups[group] > 1) {
      console.log(`${group} - ${complaintGroups[group]} complaints`);
    }
  }
}

// Call the function to analyze complaints
analyzeComplaints();
