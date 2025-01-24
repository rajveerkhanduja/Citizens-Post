// Import Firebase SDKs
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

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

// Function to add dummy admin data to Firestore
async function addDummyAdminData() {
  const admins = [
    {
      role: "Head",
      phone: "9876543210",
      password: "head1234"
    },
    {
      role: "Division",
      phone: "9876543211",
      password: "div1234"
    },
    {
      role: "Regional",
      phone: "9876543212",
      password: "reg1234"
    },
    {
      role: "Circle",
      phone: "9876543213",
      password: "cir1234"
    },
    {
      role: "Regional",
      phone: "9876543214",
      password: "reg5678"
    }
  ];

  for (const admin of admins) {
    try {
      const docRef = await addDoc(collection(db, "Admin"), admin);
      console.log("Admin document added with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding admin document: ", e);
    }
  }
}

// Add dummy admin data to the "Admin" collection
addDummyAdminData();
