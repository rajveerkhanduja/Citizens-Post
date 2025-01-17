import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Complaints from "./Complaint.js";
import FAQs from "./FAQs";
import CustomerSupport from "./CustomerSupport";

export default function SupportContents({ activeCategory }) {
  // Render content based on the active category
  const renderContent = () => {
    switch (activeCategory) {
      case 1: // Complaints
        return <Complaints />;
      case 2: // FAQs
        return <FAQs />;
      case 3: // Customer Support
        return <CustomerSupport />;
      default:
        return <Text style={styles.defaultText}>Select a category to view details</Text>;
    }
  };

  return <View style={styles.container}>{renderContent()}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 10,
  },
  defaultText: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
  },
});
