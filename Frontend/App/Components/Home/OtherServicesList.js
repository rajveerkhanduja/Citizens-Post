import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import OtherServicesItem from "./OtherServicesItem";

export default function OtherServicesList() {
  const otherServicesList = [
    { id: 1, name: "Online NPS", value: "online_nps", icon: require("./../../../assets/retirement.png") },
    { id: 2, name: "Calculate Postage", value: "calculate_postage", icon: require("./../../../assets/calculator.png") },
    { id: 3, name: "Find Pincode", value: "find_pincode", icon: require("./../../../assets/search.png") },
    { id: 4, name: "Buy Stamps", value: "buy_stamps", icon: require("./../../../assets/stamp.png") },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Other Services</Text>
      <FlatList
        data={otherServicesList}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity activeOpacity={0.7}>
            <OtherServicesItem category={item} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
    color: "#000",
    marginLeft:5,
  },
  listContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});