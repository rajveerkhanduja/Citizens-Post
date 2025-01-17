import React, { useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Pressable, ScrollView } from "react-native-gesture-handler";
import AntDesign from "@expo/vector-icons/AntDesign";
import ComplaintForm from "./ComplaintForm";

export default function Complaint() {
  const [isCreating, setIsCreating] = useState(false); // State to toggle form view

  const orderDetails = [
    
    { orderTitle: "This is the title", complaintNumber: "#4343434", status: "In Progress" },
    { orderTitle: "Another title", complaintNumber: "#5656565", status: "Resolved" },
    { orderTitle: "Another title", complaintNumber: "#5656565", status: "Resolved" },
    { orderTitle: "This is the title", complaintNumber: "#4343434", status: "In Progress" },
    { orderTitle: "Another title", complaintNumber: "#5656565", status: "Resolved" },
    { orderTitle: "Another title", complaintNumber: "#5656565", status: "Resolved" },
    { orderTitle: "This is the title", complaintNumber: "#4343434", status: "In Progress" },
    { orderTitle: "Another title", complaintNumber: "#5656565", status: "Resolved" },
    { orderTitle: "Another title", complaintNumber: "#5656565", status: "Resolved" },
    { orderTitle: "This is the title", complaintNumber: "#4343434", status: "In Progress" },
    { orderTitle: "Another title", complaintNumber: "#5656565", status: "Resolved" },
    { orderTitle: "Another title", complaintNumber: "#5656565", status: "Resolved" },
  ];

  // Handler to toggle between the complaint list and the form
  const handleCreateNew = () => {
    setIsCreating(true);
  };

  const handleFormCancel = () => {
    setIsCreating(false);
  };

  return (
    <View style={styles.mainContainer}>
      {/* Render Form if "Create New" is clicked */}
      {isCreating ? (
        <ComplaintForm onCancel={handleFormCancel} />
      ) : (
        <>
          {/* Non-scrollable header */}
          <View style={styles.topContainer}>
            <View style={styles.headingContainer}>
              <Image
                source={require("../../../assets/complaintIcon.png")}
                style={styles.complaintLogo}
              />
              <Text style={styles.heading}>Complaint</Text>
            </View>
            <Pressable style={styles.createContainer} onPress={handleCreateNew}>
              <Text style={styles.createText}>Create New</Text>
              <AntDesign name="pluscircle" size={24} color="black" />
            </Pressable>
          </View>

          {/* Scrollable list */}
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            {orderDetails.map((item, index) => (
              <View key={index} style={styles.complaintDetails}>
                <View>
                  <Text style={styles.orderTitle}>{item.orderTitle}</Text>
                </View>
                <View>
                  <Text style={styles.complaintNumber}>{item.complaintNumber}</Text>
                  <Text
                    style={[
                      styles.status,
                      { color: item.status === "Resolved" ? "green" : "orange" },
                    ]}
                  >
                    Progress: {item.status}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1, // Ensures this container fills the available space
    backgroundColor: "#f9f9f9",
  },
  topContainer: {
    width: "100%",
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  headingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  complaintLogo: {
    width: 40,
    height: 40,
  },
  createContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  createText: {
    fontSize: 16,
    marginRight: 8,
  },
  scrollViewContent: {
    padding: 16,
  },
  complaintDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  orderTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  complaintNumber: {
    fontSize: 14,
    color: "#555",
    marginBottom: 4,
  },
  status: {
    fontSize: 14,
    fontWeight: "600",
  },
});
