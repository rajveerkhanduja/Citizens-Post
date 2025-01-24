// Import Firebase SDKs
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

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

// Initialize Firestore
const db = getFirestore(app);

// Function to fetch all complaints and log them to the console
async function fetchComplaints() {
  try {
    const complaintsSnapshot = await getDocs(collection(db, "complaints"));
    const complaintsList = [];

    // Loop through each document in the snapshot and push it to complaintsList
    complaintsSnapshot.forEach((doc) => {
      complaintsList.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    // Log the complaints to the console
    console.log("Complaints:", complaintsList);
  } catch (error) {
    console.error("Error fetching complaints:", error);
  }
}

// Call the function to fetch the complaints
fetchComplaints();
