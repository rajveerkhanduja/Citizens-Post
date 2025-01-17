import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import env from "dotenv";

env.config()

// Firebase configuration
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function ComplaintForm({ onCancel }) {
  const [formData, setFormData] = useState({
    category: "",
    transactionNumber: "",
    service: "",
    complaint: "",
    customComplaint: "",
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    country: "",
    pinCode: "",
    city: "",
    state: "",
    mobile: "",
    document: null,
  });

  const handleInputChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = async () => {
    const complaintData = {
      firstName: formData.firstName || "Shrey",
      lastName: formData.lastName || "Rastogi",
      email: formData.email || "rastogishrey01@gmail.com",
      mobile: formData.mobile || "6306441496",
      address: formData.address || "SRM University AP",
      pinCode: formData.pinCode || "522503",
      city: formData.city || "Guntur",
      state: formData.state || "Andhra Pradesh",
      country: formData.country || "India",
      category: formData.category,
      transactionNumber: formData.transactionNumber,
      bookingDetails: formData.service,
      description: formData.complaint === "other" ? formData.customComplaint : formData.complaint,
      document: formData.document || null,
      status: "Pending",
      resolutionTime: 7,
      postOffice: {
        name: "srm post office",
        address: "SRM University AP",
        contact: "242001101",
        type: "sub post office",
      },
      transactionDate: new Date().toISOString().split("T")[0],
    };

    try {
      await addDoc(collection(db, "complaints"), complaintData);
      Alert.alert("Success", "Your complaint has been submitted successfully!");
    } catch (error) {
      console.error("Error submitting complaint: ", error);
      Alert.alert("Error", "Failed to submit your complaint. Please try again.");
    }
  };

  return (
    <ScrollView style={styles.formContainer}>
      <Text style={styles.heading}>Complaint Details</Text>
      <Text style={styles.label}>Category</Text>
      <Picker
        selectedValue={formData.category}
        onValueChange={(value) => handleInputChange("category", value)}
        style={styles.picker}
      >
        <Picker.Item label="--Select--" value="" />
        <Picker.Item label="Financial Services" value="Financial Services" />
        <Picker.Item label="Insurance" value="Insurance" />
      </Picker>

      <Text style={styles.label}>Transaction Number registered on your Mobile Number</Text>
      <Picker
        selectedValue={formData.transactionNumber}
        onValueChange={(value) => handleInputChange("transactionNumber", value)}
        style={styles.picker}
      >
        <Picker.Item label="--Select Transaction ID--" value="" />
        <Picker.Item label="TID123456" value="TID123456" />
        <Picker.Item label="TID987654" value="TID987654" />
        <Picker.Item label="TID543210" value="TID543210" />
      </Picker>

      <Text style={styles.label}>Service</Text>
      <Picker
        selectedValue={formData.service}
        onValueChange={(value) => handleInputChange("service", value)}
        style={styles.picker}
      >
        <Picker.Item label="--Select--" value="" />
        <Picker.Item label="ATM" value="ATM" />
        <Picker.Item label="E-Banking/M-Banking" value="e-banking" />
        <Picker.Item label="Jan Suraksha Scheme" value="jan-suraksha" />
        <Picker.Item label="SB/MIS/PPF/RD/SCSS" value="sb-mis-ppf" />
        <Picker.Item label="Others" value="others" />
      </Picker>

      <Text style={styles.label}>Complaint</Text>
      <Picker
        selectedValue={formData.complaint}
        onValueChange={(value) => handleInputChange("complaint", value)}
        style={styles.picker}
      >
        <Picker.Item label="--Select--" value="" />
        <Picker.Item label="Delay in ATM card issuance" value="delay-atm" />
        <Picker.Item label="Failed transaction" value="failed-transaction" />
        <Picker.Item label="E-Banking issues" value="e-banking-issues" />
        <Picker.Item label="Service charges discrepancy" value="service-charges" />
        <Picker.Item label="Other" value="other" />
      </Picker>

      {formData.complaint === "other" && (
        <View>
          <Text style={styles.label}>Please specify your complaint</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={formData.customComplaint}
            onChangeText={(value) => handleInputChange("customComplaint", value)}
            placeholder="Enter your complaint (maximum 500 characters)"
            multiline
          />
        </View>
      )}

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    paddingBottom: 0,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    fontWeight: "bold",
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 50,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#f9f9f9",
  },
  textArea: {
    height: 100,
    borderRadius: 10,
  },
  picker: {
    height: 60,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
  },
  submitButton: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
