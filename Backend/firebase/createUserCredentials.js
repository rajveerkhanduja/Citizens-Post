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
const db = getFirestore(app);

// User data
const users = [
  { phone: '9673439721', passcode: 'san' },
  { phone: '8306172994', passcode: 'raj' },
  { phone: '7013204582', passcode: 'sib' },
  { phone: '8091371318', passcode: 'vis' },
  { phone: '6306441496', passcode: 'she' },
  { phone: '9586948469', passcode: 'Khu' }
];

// Add users to Firestore
const addUsersToFirestore = async () => {
  const usersCollection = collection(db, 'users');

  for (let user of users) {
    try {
      await addDoc(usersCollection, {
        phone: user.phone,
        passcode: user.passcode
      });
      console.log(`User with phone ${user.phone} added successfully.`);
    } catch (error) {
      console.error("Error adding user: ", error);
    }
  }
};

// Call the function to add users
addUsersToFirestore();
