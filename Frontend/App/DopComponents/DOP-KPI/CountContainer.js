import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

export default function HorizontalScrollContainer() {
  // Data for the horizontal containers
  const data = [
    { id: "1", heading: "Total Complaints Registered ", count: 677957 },
    { id: "2", heading: "Resolved ", count: 53001 },
    { id: "3", heading: "Resolution Rate", count: "7.8%" },
    { id: "4", heading: "First Response Time", count: "2.3 hours" },
    { id: "5", heading: "Average Resolution Time", count: "8.16 days" }
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.heading}>{item.heading}</Text>
            <Text style={styles.count}>{item.count}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    marginTop: -20, // Displacing upwards by 30px
  },
  card: {
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 10,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 5,
    minWidth: 120,
  },
  heading: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
  },
  count: {
    fontSize: 30,
    fontWeight: "700",
    color: "#555",
    marginTop: 5,
  },
});
