import { StyleSheet, Text, View, Dimensions } from 'react-native';
import React from 'react';
import { BarChart } from "react-native-chart-kit";

export default function ComplaintDetails() {
  const screenWidth = Dimensions.get("window").width;

  // Generate random values for Bar Chart and Line Chart data
  const generateRandomData = (length, minValue = 10, maxValue = 100) => {
    return Array.from({ length }, () =>
      Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue
    );
  };

  // Data for Bar and Line combined chart
  const combinedData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        type: 'bar', // First dataset is a bar chart
        data: generateRandomData(6), // Random data for bar chart
        color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`, // Bar color
      },
      {
        type: 'line', // Second dataset is a line chart
        data: generateRandomData(6, 20, 150), // Random data for line chart
        color: (opacity = 1) => `rgba(0, 191, 255, ${opacity})`, // Line color
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: "#ffffff",
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: "#ffffff",
    backgroundGradientToOpacity: 1,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Text and line color
    strokeWidth: 2, // Optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24, fontWeight: "800", marginBottom: -2 }}>
        Complaint Trends
      </Text>
      <Text style={{ fontSize: 12, fontWeight: "500" }}>
        Complaints and Resolution Progress
      </Text>

      {/* Combined Bar and Line Chart */}
      <BarChart
        data={combinedData}
        width={screenWidth - 60}
        height={250}
        yAxisLabel=""
        chartConfig={chartConfig}
        style={styles.chartStyle}
        fromZero={true}
        withDots={true} // To add dots on line chart
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "95%",
    backgroundColor: "#fff",
    marginHorizontal: 10,
    marginTop: 20,
    marginBottom:10,
    padding: 10,
    borderRadius: 20,
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Shadow for Android
    elevation: 5,
  },
  chartStyle: {
    marginVertical: 10,
    borderRadius: 16,
  },
});
