import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBlmBxRs-lWm573NVNO3BgGPPGYlDe7-lo",
  authDomain: "sih-citizen-charter.firebaseapp.com",
  projectId: "sih-citizen-charter",
  storageBucket: "sih-citizen-charter.firebasestorage.app",
  messagingSenderId: "930469006274",
  appId: "1:930469006274:web:de6fc2c239f3887230e45b",
  measurementId: "G-V7EM9Y68MY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const AdminDataComponent = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch admin data from Firestore
  const fetchAdminData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Admin"));
      const fetchedAdmins = [];

      querySnapshot.forEach((doc) => {
        fetchedAdmins.push(doc.data());
        console.log(doc.id, " => ", doc.data()); // Log the document data
      });

      // Update state with fetched data
      setAdmins(fetchedAdmins);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
      console.error("Error fetching admin data:", err);
    }
  };

  // Fetch admin data when component mounts
  useEffect(() => {
    fetchAdminData();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Data</Text>
      <FlatList
        data={admins}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{JSON.stringify(item)}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AdminDataComponent;
