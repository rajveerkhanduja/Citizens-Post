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

// Function to fetch consignments from the 'RegionalPostConsignments' collection
async function fetchRegionalPostConsignments() {
  const consignmentsCollection = collection(db, "RegionalPostConsignments");

  try {
    // Fetching all documents from the collection
    const querySnapshot = await getDocs(consignmentsCollection);

    // Looping through the results and logging them
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  } catch (error) {
    console.error("Error fetching consignments: ", error);
  }
}

// Call the function to fetch consignments
fetchRegionalPostConsignments();
