import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function Notification({ notifications }) {
  const navigation = useNavigation();

  const renderNotification = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.notificationCard,
        item.isRead ? styles.readNotification : styles.unreadNotification,
      ]}
      onPress={() =>
        navigation.navigate("NotificationDetails", {
          notificationData: item,
        })
      }
    >
      <View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.message}>Category: {item.message.category}</Text>
        <Text style={styles.message}>Days: {item.message.days}</Text>
        <Text style={styles.message}>
          Transit Duration: {item.message.transit_duration}
        </Text>
        <Text style={styles.timestamp}>{item.timestamp}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {notifications.length === 0 ? (
        <Text style={styles.noNotificationsText}>No Notifications</Text>
      ) : (
        <FlatList
          data={notifications}
          renderItem={renderNotification}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  notificationCard: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  readNotification: {
    backgroundColor: "#f0f0f0",
  },
  unreadNotification: {
    backgroundColor: "#ffe0b2",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  message: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
  timestamp: {
    fontSize: 12,
    color: "#999",
    marginTop: 8,
  },
  noNotificationsText: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
    marginTop: 50,
  },
});