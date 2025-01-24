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

// Function to add multiple sample complaint documents to Firestore
async function initializeCollection() {
  const complaints = [
    // Complaint 1
    {
      firstName: "Ravi",
      lastName: "Kumar",
      email: "ravi.kumar@example.com",
      mobile: "9988776655",
      address: "15, Vikas Nagar, Lucknow",
      pinCode: "226001",
      city: "Lucknow",
      state: "Uttar Pradesh",
      country: "India",
      category: "Missing Parcel",
      description: "A parcel that was sent from Lucknow to Kanpur is missing and not found in the system.",
      bookingDetails: "Parcel lost in transit.",
      document: null,
      transactionNumber: "2007896543",
      transactionDate: "2024-12-05",
      status: "Pending",
      resolutionTime: 10, // Resolution time as an integer (10 days)
      postOffice: {
        name: "Lucknow Division Post Office",
        address: "Vikas Nagar, Lucknow",
        contact: "0522-22334455",
        type: "Division Post Office"
      }
    },
    // Complaint 2
    {
      firstName: "Priya",
      lastName: "Sharma",
      email: "priya.sharma@example.com",
      mobile: "9888776655",
      address: "20, Shubham Colony, Jaipur",
      pinCode: "302018",
      city: "Jaipur",
      state: "Rajasthan",
      country: "India",
      category: "Damaged Parcel",
      description: "My parcel arrived damaged, with the contents broken during delivery.",
      bookingDetails: "Parcel contents damaged during delivery.",
      document: null,
      transactionNumber: "2005678932",
      transactionDate: "2024-12-07",
      status: "Pending",
      resolutionTime: 12, // Resolution time as an integer (12 days)
      postOffice: {
        name: "Jaipur Division Post Office",
        address: "Shubham Colony, Jaipur",
        contact: "0141-22334422",
        type: "Division Post Office"
      }
    },
    // Complaint 3
    {
      firstName: "Arun",
      lastName: "Singh",
      email: "arun.singh@example.com",
      mobile: "9798989898",
      address: "25, Gandhi Nagar, Delhi",
      pinCode: "110031",
      city: "Delhi",
      state: "Delhi",
      country: "India",
      category: "Delayed Delivery",
      description: "The parcel was dispatched on time, but it has not been delivered even after the expected date.",
      bookingDetails: "Delayed parcel delivery.",
      document: null,
      transactionNumber: "2004567821",
      transactionDate: "2024-12-03",
      status: "Pending",
      resolutionTime: 7, // Resolution time as an integer (7 days)
      postOffice: {
        name: "Delhi Division Post Office",
        address: "Gandhi Nagar, Delhi",
        contact: "011-22445566",
        type: "Division Post Office"
      }
    },
    // Complaint 4
    {
      firstName: "Neelam",
      lastName: "Joshi",
      email: "neelam.joshi@example.com",
      mobile: "9555332211",
      address: "40, Laxmi Nagar, Chennai",
      pinCode: "600029",
      city: "Chennai",
      state: "Tamil Nadu",
      country: "India",
      category: "Wrong Delivery",
      description: "A parcel that was intended for me was delivered to the wrong address.",
      bookingDetails: "Incorrect address mentioned in the delivery system.",
      document: null,
      transactionNumber: "2001239876",
      transactionDate: "2024-12-01",
      status: "Pending",
      resolutionTime: 5, // Resolution time as an integer (5 days)
      postOffice: {
        name: "Chennai Division Post Office",
        address: "Laxmi Nagar, Chennai",
        contact: "044-22334477",
        type: "Division Post Office"
      }
    },
    // Complaint 5
    {
      firstName: "Rajesh",
      lastName: "Patel",
      email: "rajesh.patel@example.com",
      mobile: "9444556677",
      address: "60, Shanti Colony, Ahmedabad",
      pinCode: "380014",
      city: "Ahmedabad",
      state: "Gujarat",
      country: "India",
      category: "Unresponsive Customer Service",
      description: "The customer service has not been responsive to my queries regarding my parcel status.",
      bookingDetails: "No reply from customer support.",
      document: null,
      transactionNumber: "2006784321",
      transactionDate: "2024-12-10",
      status: "Pending",
      resolutionTime: 15, // Resolution time as an integer (15 days)
      postOffice: {
        name: "Ahmedabad Division Post Office",
        address: "Shanti Colony, Ahmedabad",
        contact: "079-23456788",
        type: "Division Post Office"
      }
    },
    // Complaint 6
    {
      firstName: "Vikram",
      lastName: "Bansal",
      email: "vikram.bansal@example.com",
      mobile: "9865321478",
      address: "10, MG Road, Bangalore",
      pinCode: "560001",
      city: "Bangalore",
      state: "Karnataka",
      country: "India",
      category: "Parcel Not Received",
      description: "I have not received my parcel even though it was dispatched 5 days ago.",
      bookingDetails: "Parcel is missing in transit.",
      document: null,
      transactionNumber: "2001234567",
      transactionDate: "2024-12-02",
      status: "Pending",
      resolutionTime: 8, // Resolution time as an integer (8 days)
      postOffice: {
        name: "Bangalore Division Post Office",
        address: "MG Road, Bangalore",
        contact: "080-22334411",
        type: "Division Post Office"
      }
    },
    // Complaint 7
    {
      firstName: "Sonal",
      lastName: "Mehta",
      email: "sonal.mehta@example.com",
      mobile: "9912345678",
      address: "28, Dadar West, Mumbai",
      pinCode: "400028",
      city: "Mumbai",
      state: "Maharashtra",
      country: "India",
      category: "Delivery Address Mismatch",
      description: "The parcel was sent to the wrong address, which was mistakenly entered.",
      bookingDetails: "Address mismatch during delivery.",
      document: null,
      transactionNumber: "2009876543",
      transactionDate: "2024-12-09",
      status: "Pending",
      resolutionTime: 9, // Resolution time as an integer (9 days)
      postOffice: {
        name: "Mumbai Division Post Office",
        address: "Dadar West, Mumbai",
        contact: "022-23334455",
        type: "Division Post Office"
      }
    },
    // Complaint 8
    {
      firstName: "Anjali",
      lastName: "Patel",
      email: "anjali.patel@example.com",
      mobile: "9500345678",
      address: "12, Whitefield, Hyderabad",
      pinCode: "500072",
      city: "Hyderabad",
      state: "Telangana",
      country: "India",
      category: "Non-Delivery",
      description: "The parcel was marked for delivery but was not delivered and returned to the post office.",
      bookingDetails: "Parcel returned after failed delivery attempt.",
      document: null,
      transactionNumber: "2009871234",
      transactionDate: "2024-12-06",
      status: "Pending",
      resolutionTime: 6, // Resolution time as an integer (6 days)
      postOffice: {
        name: "Hyderabad Division Post Office",
        address: "Whitefield, Hyderabad",
        contact: "040-23456788",
        type: "Division Post Office"
      }
    },
    // Complaint 9
    {
      firstName: "Kiran",
      lastName: "Reddy",
      email: "kiran.reddy@example.com",
      mobile: "9176543210",
      address: "35, Jambhulwadi, Pune",
      pinCode: "411019",
      city: "Pune",
      state: "Maharashtra",
      country: "India",
      category: "Wrong Item Delivered",
      description: "A wrong item was delivered to me instead of the original order.",
      bookingDetails: "Wrong product delivered.",
      document: null,
      transactionNumber: "2008765432",
      transactionDate: "2024-12-08",
      status: "Pending",
      resolutionTime: 11, // Resolution time as an integer (11 days)
      postOffice: {
        name: "Pune Division Post Office",
        address: "Jambhulwadi, Pune",
        contact: "020-23456788",
        type: "Division Post Office"
      }
    },
    // Complaint 10
    {
      firstName: "Madhuri",
      lastName: "Gupta",
      email: "madhuri.gupta@example.com",
      mobile: "9801122334",
      address: "8, Baner Road, Pune",
      pinCode: "411045",
      city: "Pune",
      state: "Maharashtra",
      country: "India",
      category: "Late Pickup",
      description: "The parcel pickup was delayed by over 2 days.",
      bookingDetails: "Parcel pickup delayed.",
      document: null,
      transactionNumber: "2004321098",
      transactionDate: "2024-12-04",
      status: "Pending",
      resolutionTime: 13, // Resolution time as an integer (13 days)
      postOffice: {
        name: "Pune Division Post Office",
        address: "Baner Road, Pune",
        contact: "020-23457890",
        type: "Division Post Office"
      }
    }
  ];

  // Add each complaint to Firestore
  complaints.forEach(async (complaint) => {
    try {
      await addDoc(collection(db, "DivisionOfficeComplaints"), complaint);
      console.log(`Complaint from ${complaint.firstName} ${complaint.lastName} added successfully!`);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  });
}

// Run the function to add complaints
initializeCollection();
