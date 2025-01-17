import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { BarChart } from "react-native-chart-kit";
import env from "dotenv";

env.config()

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Helper function to extract days from delay_duration (e.g., "6 Days")
const extractDays = (duration) => {
  const match = duration.match(/(\d+)\s*Days?/);
  return match ? parseInt(match[1], 10) : 0;
};

// Helper function to convert hours to days
const convertHoursToDays = (hours) => hours / 24;

// React Native component to fetch and log consignments
const ConsignmentFetcher = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [articleTypeCount, setArticleTypeCount] = useState({});
  const [averageDelayDuration, setAverageDelayDuration] = useState(0);
  const [averageTransitDuration, setAverageTransitDuration] = useState(0);

  // Function to fetch consignments from Firestore
  const fetchConsignments = async () => {
    try {
      const consignmentsCollection = collection(db, 'consignments');
      const querySnapshot = await getDocs(consignmentsCollection);
      
      let totalDelayDuration = 0;
      let totalTransitDuration = 0;
      let numConsignments = 0;
      let articleCount = {};

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        
        // Log the article_type of each consignment
        const articleType = data.article_type || "Others"; // Default to 'Others' if undefined or null
        console.log("Article Type:", articleType); // Log the article type for each document

        // 1. Article Type Count (count all values including undefined or null)
        articleCount[articleType] = (articleCount[articleType] || 0) + 1;

        // 2. Calculate Delay Duration (in days)
        const delayDuration = data.delay_duration || "0 Days";
        totalDelayDuration += extractDays(delayDuration);

        // 3. Calculate Transit Duration (convert hours to days if present)
        const transitDuration = data.transit_duration || "0 Days";
        const transitDaysMatch = transitDuration.match(/(\d+)\s*Days?/);
        const transitHoursMatch = transitDuration.match(/(\d+)\s*Hours?/);

        let transitDays = transitDaysMatch ? parseInt(transitDaysMatch[1], 10) : 0;
        let transitHours = transitHoursMatch ? parseInt(transitHoursMatch[1], 10) : 0;
        
        totalTransitDuration += transitDays + convertHoursToDays(transitHours);
        
        numConsignments++;
      });

      // Calculate averages and round to 2 decimal places
      const avgDelay = numConsignments ? (totalDelayDuration / numConsignments).toFixed(2) : 0;
      const avgTransit = numConsignments ? (totalTransitDuration / numConsignments).toFixed(2) : 0;

      // Update state with the calculated results
      setArticleTypeCount(articleCount);
      setAverageDelayDuration(avgDelay);
      setAverageTransitDuration(avgTransit);
    } catch (error) {
      setError(error.message);
      console.error("Error fetching consignments: ", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch consignments on component mount
  useEffect(() => {
    fetchConsignments();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading consignments...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error fetching consignments: {error}</Text>
      </View>
    );
  }

  // Prepare data for BarChart
  const articleTypes = Object.keys(articleTypeCount);
  const articleCounts = articleTypes.map((articleType) => articleTypeCount[articleType]);

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Consignment Statistics</Text>
        <View style={[styles.container, { flexDirection: "row", padding: 10, gap: 10 }]}>
            <View style={{ width: "50%", backgroundColor: "#fff", alignItems: "center", justifyContent: "center", borderRadius: 5 }}>
                <Text style={styles.text}>Average Delay Duration: </Text>
                <Text>{averageDelayDuration} Days</Text>
            </View>

            <View style={{ width: "50%", backgroundColor: "#fff", alignItems: "center", justifyContent: "center", borderRadius: 5 }}>
                <Text style={styles.text}>Average Transit Duration: </Text>
                <Text>{averageTransitDuration} Days</Text>
            </View>
        </View>





        <Text style={styles.text}>Article Type Count:</Text>
        {Object.entries(articleTypeCount).map(([articleType, count]) => (
            <Text key={articleType} style={styles.text}>
                {articleType}: {count}
            </Text>
        ))}

        {/* Bar Chart for Article Count */}
        <BarChart
            data={{
                labels: articleTypes,
                datasets: [
                    {
                        data: articleCounts,
                    },
                ],
            }}
            width={Dimensions.get("window").width - 65} // Adjust width based on screen size
            height={220}
            chartConfig={{
                backgroundColor: "#1cc910",
                backgroundGradientFrom: "#43e97b",
                backgroundGradientTo: "#a7f6a0",
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                    borderRadius: 16,
                },
            }}
            style={{ marginVertical: 8, borderRadius: 16 }}
        />
    </View>
);
};

// Basic styles
const styles = StyleSheet.create({
container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
},
title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
},
text: {
    fontSize: 16,
    marginVertical: 5,
},
container: {
    padding: 10,
    gap: 20,
    backgroundColor: "#f9f9f9", // Optional, add a background color
    borderRadius: 10, // Optional, rounded corners for the main container
    shadowColor: "#000", // Shadow color for iOS
    shadowOffset: { width: 0, height: 2 }, // Shadow direction
    shadowOpacity: 0.1, // Shadow opacity (adjust as needed)
    shadowRadius: 4, // Shadow blur radius (adjust as needed)
    elevation: 5, // For Android shadow
},
text: {
    fontSize: 16,
    fontWeight: "bold",
},
});


export default ConsignmentFetcher;
