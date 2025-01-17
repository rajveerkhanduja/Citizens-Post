import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

const GraphDetailsScreen = ({ route }) => {
  const { graphData, title } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <LineChart
        data={graphData}
        width={Dimensions.get("window").width - 40}
        height={220}
        chartConfig={{
          backgroundColor: "#ff9800",
          backgroundGradientFrom: "#ffb74d",
          backgroundGradientTo: "#ff7043",
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ff7043",
          },
        }}
        bezier
        style={styles.chart}
      />
      <Text style={styles.details}>
        This graph shows detailed insights into {title}.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  chart: {
    borderRadius: 16,
  },
  details: {
    fontSize: 14,
    marginTop: 20,
    textAlign: "center",
    color: "#333",
  },
});

export default GraphDetailsScreen;
