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

// Function to add multiple sample consignment documents to Firestore in CirclePostConsignments collection
async function initializeCirclePostConsignments() {
  const consignments = [
    {
      consignment: {
        number: "CP180864445IN",
        article_type: "Parcel",
        booked_at: "Bhandup SO",
        booked_on: "2024-11-10T09:30:00.000000Z",
        current_status: "Item Delivered",
        delivered_at: "2024-11-18T16:30:00.000000Z",
        delivery_location: "Bhandup West",
        delivery_status: "ItemDelivered",
        destination_pincode: "400078",
        origin_pincode: "400078",
        transit_duration: "8 Days",
        delay_duration: "0 Days",
        delay_reason: "None",
        post_office_type: "Head Post Office",
        tracking_events: [
          { event: "Item Booked", tracked_at: "2024-11-10T09:30:00.000000Z" },
          { event: "Item Dispatched", tracked_at: "2024-11-10T11:00:00.000000Z" },
          { event: "Item Received", tracked_at: "2024-11-13T14:30:00.000000Z" },
          { event: "Out for Delivery", tracked_at: "2024-11-18T15:30:00.000000Z" },
          { event: "Item Delivered(Addressee)", tracked_at: "2024-11-18T16:30:00.000000Z" }
        ]
      }
    },
    {
      consignment: {
        number: "CP180864446IN",
        article_type: "MediaPost",
        booked_at: "Ghatkopar SO",
        booked_on: "2024-11-11T13:45:00.000000Z",
        current_status: "Item Delivered",
        delivered_at: "2024-11-19T17:00:00.000000Z",
        delivery_location: "Ghatkopar East",
        delivery_status: "ItemDelivered",
        destination_pincode: "400077",
        origin_pincode: "400086",
        transit_duration: "8 Days and 3 Hours",
        delay_duration: "1 Day",
        delay_reason: "Postal backlog due to holidays",
        post_office_type: "Branch Post Office",
        tracking_events: [
          { event: "Item Booked", tracked_at: "2024-11-11T13:45:00.000000Z" },
          { event: "Item Dispatched", tracked_at: "2024-11-11T15:00:00.000000Z" },
          { event: "Item Received", tracked_at: "2024-11-14T16:00:00.000000Z" },
          { event: "Out for Delivery", tracked_at: "2024-11-19T14:00:00.000000Z" },
          { event: "Item Delivered(Addressee)", tracked_at: "2024-11-19T17:00:00.000000Z" }
        ]
      }
    },
    {
      consignment: {
        number: "CP180864447IN",
        article_type: "Parcel",
        booked_at: "Kurla SO",
        booked_on: "2024-11-12T14:00:00.000000Z",
        current_status: "Item Delivered",
        delivered_at: "2024-11-20T18:15:00.000000Z",
        delivery_location: "Kurla West",
        delivery_status: "ItemDelivered",
        destination_pincode: "400070",
        origin_pincode: "400072",
        transit_duration: "8 Days and 4 Hours",
        delay_duration: "1 Day",
        delay_reason: "Weather disruptions",
        post_office_type: "Head Post Office",
        tracking_events: [
          { event: "Item Booked", tracked_at: "2024-11-12T14:00:00.000000Z" },
          { event: "Item Dispatched", tracked_at: "2024-11-12T16:00:00.000000Z" },
          { event: "Item Received", tracked_at: "2024-11-15T17:30:00.000000Z" },
          { event: "Out for Delivery", tracked_at: "2024-11-20T15:00:00.000000Z" },
          { event: "Item Delivered(Addressee)", tracked_at: "2024-11-20T18:15:00.000000Z" }
        ]
      }
    },
    {
      consignment: {
        number: "CP180864448IN",
        article_type: "BookParcel",
        booked_at: "Malad SO",
        booked_on: "2024-11-13T15:30:00.000000Z",
        current_status: "Item Delivered",
        delivered_at: "2024-11-21T19:00:00.000000Z",
        delivery_location: "Malad East",
        delivery_status: "ItemDelivered",
        destination_pincode: "400097",
        origin_pincode: "400064",
        transit_duration: "8 Days and 4 Hours",
        delay_duration: "0 Days",
        delay_reason: "None",
        post_office_type: "Branch Post Office",
        tracking_events: [
          { event: "Item Booked", tracked_at: "2024-11-13T15:30:00.000000Z" },
          { event: "Item Dispatched", tracked_at: "2024-11-13T17:00:00.000000Z" },
          { event: "Item Received", tracked_at: "2024-11-16T13:30:00.000000Z" },
          { event: "Out for Delivery", tracked_at: "2024-11-21T17:00:00.000000Z" },
          { event: "Item Delivered(Addressee)", tracked_at: "2024-11-21T19:00:00.000000Z" }
        ]
      }
    },
    {
      consignment: {
        number: "CP180864449IN",
        article_type: "InternationalParcel",
        booked_at: "Santacruz SO",
        booked_on: "2024-11-14T11:30:00.000000Z",
        current_status: "Item Delivered",
        delivered_at: "2024-11-22T10:30:00.000000Z",
        delivery_location: "Santacruz West",
        delivery_status: "ItemDelivered",
        destination_pincode: "400055",
        origin_pincode: "400086",
        transit_duration: "8 Days",
        delay_duration: "0 Days",
        delay_reason: "None",
        post_office_type: "Head Post Office",
        tracking_events: [
          { event: "Item Booked", tracked_at: "2024-11-14T11:30:00.000000Z" },
          { event: "Item Dispatched", tracked_at: "2024-11-14T13:00:00.000000Z" },
          { event: "Item Received", tracked_at: "2024-11-17T10:00:00.000000Z" },
          { event: "Out for Delivery", tracked_at: "2024-11-22T09:00:00.000000Z" },
          { event: "Item Delivered(Addressee)", tracked_at: "2024-11-22T10:30:00.000000Z" }
        ]
      }
    }
  ];

  for (const consignmentData of consignments) {
    try {
      const docRef = await addDoc(collection(db, "CirclePostConsignments"), consignmentData);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
}

// Initialize the collection with sample consignments
initializeCirclePostConsignments();
