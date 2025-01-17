import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import Colors from "../../Shared/Colors"; // Ensure the path is correct

export default function OtherServicesItem({ category }) {
  if (!category || !category.icon || !category.name) {
    console.warn("Missing data in category:", category);
    return null;
  }

  return (
    <View style={styles.itemContainer}>
      <View style={styles.iconContainer}>
        <Image source={category.icon} style={styles.icon} resizeMode="contain" />
      </View>
      <Text style={styles.name}>{category.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    alignItems: "center",
    margin: 5,
    width: 90,
    height: 100,
    backgroundColor: Colors.WHITE,
    justifyContent: "space-between",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    shadowOffset: { width: 0, height: 2 },
    padding: 10,
    justifyContent: "center",
    alignItems: "center", 
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: "100%",
    height: "100%",
  },
  name: {
    fontSize: 13,
    textAlign: "center",
    fontWeight: "600",
    color: "#000",
  },
});