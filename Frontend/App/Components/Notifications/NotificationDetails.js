import React from "react";
import { View, Text, StyleSheet, Button, ScrollView } from "react-native";

export default function NotificationDetails({ route, navigation }) {
  const { notificationData } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{notificationData.title}</Text>
      <View style={styles.messageContainer}>
        <Text style={styles.messageLabel}>Category:</Text>
        <Text style={styles.messageValue}>
          {notificationData.message.category}
        </Text>
      </View>
      <View style={styles.messageContainer}>
        <Text style={styles.messageLabel}>Days:</Text>
        <Text style={styles.messageValue}>{notificationData.message.days}</Text>
      </View>
      <View style={styles.messageContainer}>
        <Text style={styles.messageLabel}>Transit Duration:</Text>
        <Text style={styles.messageValue}>
          {notificationData.message.transit_duration}
        </Text>
      </View>
      <Text style={styles.timestamp}>Timestamp: {notificationData.timestamp}</Text>
      <Button title="Back to Notifications" onPress={() => navigation.goBack()} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    color: "#333",
  },
  messageContainer: {
    marginBottom: 16,
  },
  messageLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  messageValue: {
    fontSize: 16,
    color: "#555",
    marginTop: 4, 
  },
  timestamp: {
    fontSize: 14,
    color: "#999",
    marginVertical: 24,
  },
});
