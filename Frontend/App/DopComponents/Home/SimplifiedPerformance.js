import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation

const data = [
  {
    id: "1",
    title: "Complaints",
    logo: require("../../../assets/complain.png"),
    graphData: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [{ data: [20, 45, 28, 80, 99, 43] }],
    },
  },
  {
    id: "2",
    title: "Delivery Performance",
    logo: require("../../../assets/product-selling.png"),
    graphData: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [{ data: [30, 50, 40, 95, 85, 70] }],
    },
  },
  {
    id: "3",
    title: "Citizen Engagement",
    logo: require("../../../assets/citizens.png"),
    graphData: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [{ data: [50, 60, 70, 80, 90, 100] }],
    },
  },
];

const OptionGraphComponent = () => {
  const navigation = useNavigation(); // Use useNavigation hook
  const [selectedOption, setSelectedOption] = useState(data[0]);

  return (
    <View style={styles.container}>
      {/* Graph Section */}
      <View style={styles.graphContainer}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("GraphDetails", {
              graphData: selectedOption.graphData,
              title: selectedOption.title,
            })
          }
        >
          <LineChart
            data={selectedOption.graphData}
            width={Dimensions.get("window").width - 40}
            height={220}
            chartConfig={{
              backgroundColor: "#ff9800",
              backgroundGradientFrom: "#ffa726",
              backgroundGradientTo: "#fb8c00",
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#fb8c00",
              },
            }}
            bezier
            style={styles.chart}
          />
        </TouchableOpacity>
      </View>

      {/* Options Section */}
      <View style={styles.optionsContainer}>
        {data.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.option,
              selectedOption.id === item.id && styles.selectedOption,
            ]}
            onPress={() => setSelectedOption(item)}
          >
            <Image source={item.logo} style={styles.logo} />
            <Text style={styles.optionText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#f5f5f5", // Softer background for premium look
    padding: 15,
    flex: 1, // Ensures the container takes full height
  },
  graphContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 30,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 8, // Slight elevation for 3D effect
  },
  chart: {
    borderRadius: 16,
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    width: "100%",
    paddingHorizontal: 5,
  },
  option: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    marginHorizontal: 6,
    width: "30%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4, // Slight shadow for a card-like feel
    paddingHorizontal: 5, // Adding padding to make it comfortable for touch
  },
  selectedOption: {
    borderColor: "#007bff",
    backgroundColor: "#e3f2fd", // Light blue for selected option
  },
  logo: {
    width: 40,
    height: 40,
    marginBottom: 8,
  },
  optionText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    letterSpacing: 0.5,
  },
});

export default OptionGraphComponent;
