import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import env from ".env"



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

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

const ComplaintStats = () => {
  const [complaints, setComplaints] = useState([]);
  const [resolvedCount, setResolvedCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [categoryData, setCategoryData] = useState([]);
  const [avgResolutionTime, setAvgResolutionTime] = useState(0); // New state for average resolution time

  useEffect(() => {
    // Fetch complaints data
    const fetchComplaints = async () => {
      try {
        const complaintsSnapshot = await getDocs(collection(db, "complaints"));
        const complaintsList = [];

        complaintsSnapshot.forEach((doc) => {
          complaintsList.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        setComplaints(complaintsList);

        processComplaintData(complaintsList);
      } catch (error) {
        console.error("Error fetching complaints:", error);
      }
    };

    fetchComplaints();
  }, []);

  // Process the complaint data to count resolved, pending, and categorized complaints
  const processComplaintData = (complaints) => {
    let resolved = 0;
    let pending = 0;
    const categoryCounts = {};
    let totalResolutionTime = 0; // To calculate average resolution time
    let resolvedComplaints = 0; // Count of resolved complaints for average calculation

    complaints.forEach((complaint) => {
      if (complaint.status === 'Resolved') {
        resolved++;
        if (complaint.createdAt && complaint.resolvedAt) {
          // Convert dates to Date objects for time calculation
          const createdAt = new Date(complaint.createdAt.seconds * 1000); // Firebase timestamp to JS Date
          const resolvedAt = new Date(complaint.resolvedAt.seconds * 1000); // Firebase timestamp to JS Date
          const resolutionTime = (resolvedAt - createdAt) / (1000 * 60 * 60 * 24); // Time difference in days
          totalResolutionTime += resolutionTime;
          resolvedComplaints++;
        }
      } else if (complaint.status === 'Pending') {
        pending++;
      }

      // Count complaints by category and store the description
      if (complaint.category) {
        if (!categoryCounts[complaint.category]) {
          categoryCounts[complaint.category] = { count: 0, description: complaint.categoryDescription || 'No description' };
        }
        categoryCounts[complaint.category].count++;
      }
    });

    // Prepare the category data for the pie chart
    const categoryDataArray = Object.entries(categoryCounts).map(([category, { count, description }]) => ({
      name: category,
      count,
      description,
      color: getRandomColor(), // Generate a random color for each category
      legendFontColor: '#000',
      legendFontSize: 15
    }));

    setResolvedCount(resolved);
    setPendingCount(pending);
    setCategoryData(categoryDataArray);

    // Calculate the average resolution time (in days)
    const averageTime = resolvedComplaints > 0 ? totalResolutionTime / resolvedComplaints : 0;
    setAvgResolutionTime(averageTime.toFixed(2)); // Display average in 2 decimal places
  };

  // Generate a random color for the pie chart
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Complaint Statistics</Text>

      {/* Resolved and Pending Counts Container */}
      <View style={styles.countContainer}>
        <View style={styles.countItem}>
          <Text style={styles.countText}>Resolved: {resolvedCount}</Text>
        </View>
        <View style={styles.countItem}>
          <Text style={styles.countText}>Pending: {pendingCount}</Text>
        </View>
      </View>

      <View style={styles.pieChartContainer}>
        <View style={{paddingLeft:"40%"}}>
          {/* Pie Chart */}
          <PieChart
            data={categoryData}
            width={Dimensions.get('window').width - 40}
            height={220}
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ff9800',
              backgroundGradientTo: '#ff7043',
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#ff7043',
              },
            }}
            accessor="count"
            backgroundColor="transparent"
            paddingLeft="15"
            style={styles.chart}
            hasLegend={false} // Hide the default legend
          />
        </View>

        {/* Custom Legends Below the Pie Chart */}
        <View style={styles.legendContainer}>
          {categoryData.map((category, index) => (
            <View key={index} style={styles.legendItem}>
              <View
                style={[styles.legendDot, { backgroundColor: category.color }]}
              />
              <Text style={styles.legendText}>{category.name}</Text>
            </View>
          ))}
        </View>
      </View>

      <Text style={styles.categoryTitle}>Complaints by Category</Text>
      <View style={styles.categoryContainer}>
        {categoryData.map((category, index) => (
          <View key={index} style={styles.categoryItem}>
            <Text style={styles.categoryText}>
              {category.name}: {category.count} complaints
            </Text>
            <Text style={styles.descriptionText}>{category.description}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#ffffff',
    padding: 10,
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  countContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  countItem: {
    flex: 1,
    alignItems: 'center',
  },
  countText: {
    fontSize: 18,
    marginBottom: 10,
  },
  pieChartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  chart: {
    borderRadius: 16,
  },
  legendContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
    marginTop: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 10,
  },
  legendDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginRight: 5,
  },
  legendText: {
    fontSize: 14,
    color: '#555',
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  categoryItem: {
    marginVertical: 5,
    padding: 10,
    backgroundColor: '#f4f4f4',
    borderRadius: 10,
    width: '48%',
    marginBottom: 15,
  },
  categoryText: {
    fontSize: 16,
    marginVertical: 5,
  },
  descriptionText: {
    fontSize: 14,
    color: '#777',
  },
});

export default ComplaintStats;
