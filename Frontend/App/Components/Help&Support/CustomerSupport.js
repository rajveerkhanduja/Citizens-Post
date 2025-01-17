import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function CustomerSupport() {
  const navigation = useNavigation();

  const options = [
    "Feedback",
    "Register Public Grievances",
    "Contact Us",
    "Prohibited Articles",
    "Addressing Tips",
    "Packaging Tips",
    "Corporate Complaint",
    "Guidelines On Complaints",
    "Customers Satisfaction Survey",
    "PG Portal-CPGRAMS",
  ];

  const handleOptionPress = (option) => {
    if (option === "Feedback") {
      navigation.navigate("FeedbackForm");
    } else {
      alert(`You selected: ${option}`);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.contactMethods}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.contactButton}
            onPress={() => handleOptionPress(option)}
          >
            <Text style={styles.buttonText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop:20,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  contactMethods: {
    width: "100%",
    alignItems: "center",
  },
  contactButton: {
    width: "90%",
    padding: 15,
    borderBottomWidth:1,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
  },
});
