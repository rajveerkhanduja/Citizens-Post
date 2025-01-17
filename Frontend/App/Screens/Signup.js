import React, { useState } from 'react';
import { SafeAreaView, View, Image, Text, StyleSheet, Alert, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform, Pressable, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

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



export default function Signup({ navigation }) {
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [passcode, setPasscode] = useState('');

  const handleUserSignup = async () => {
    // Basic validation
    if (!phoneNumber || !passcode) {
      Alert.alert('Error', 'Please enter both phone number and passcode');
      return;
    }

    try {
      // Add user to Firestore
      const usersCollection = collection(db, 'users');
      await addDoc(usersCollection, {
        phone: phoneNumber,
        passcode: passcode, // Note: In a real app, never store passwords in plain text
        language: selectedLanguage
      });

      // Show success message
      Alert.alert('Success', 'User registered successfully', [
        { text: 'OK', onPress: () => navigation.navigate('Login') }
      ]);
    } catch (error) {
      console.error("Error adding user: ", error);
      Alert.alert('Error', 'Failed to register. Please try again.');
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.language}>
          <Picker 
            selectedValue={selectedLanguage} 
            onValueChange={setSelectedLanguage} 
            style={styles.picker}
          >
            <Picker.Item label="English" value="English" />
            <Picker.Item label="Hindi" value="Hindi" />
            <Picker.Item label="Spanish" value="Spanish" />
            <Picker.Item label="French" value="French" />
          </Picker>
        </View>

        <View style={styles.topImgContainer}>
          <Image source={require('../../assets/opening_top.png')} style={styles.topImg} />
          <Image source={require('../../assets/login-image.png')} style={styles.mainImg} />
          
          <View style={styles.textContainer}>
            <Text style={styles.heading}>SignUp Now</Text>
            <Text style={styles.subHeading}>Please enter your details</Text>
          </View>

          {/* Input Fields */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              keyboardType="phone-pad"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
            <TextInput
              style={styles.input}
              placeholder="Passcode"
              secureTextEntry
              value={passcode}
              onChangeText={setPasscode}
            />
          </View>

          <View style={styles.options}>
            <Pressable 
              style={({ pressed }) => [styles.userButton, pressed && styles.pressed]} 
              onPress={handleUserSignup}
            >
              <Text style={styles.userButtonText}>SignUp as User</Text>
            </Pressable>
            <Pressable 
              style={({ pressed }) => [styles.adminButton, pressed && styles.pressed]} 
              onPress={() => Alert.alert('Admin signup', 'Admin signup is not implemented yet')}
            >
              <Text style={styles.adminButtonText}>SignUp as DOP Member</Text>
            </Pressable>
          </View>

          <View style={styles.grayLine} />
          
          <View style={styles.loginContainer}>
            <Text style={styles.normalText}>Already have an account?</Text>
            <Pressable onPress={() => navigation.navigate('Login')}>
              <Text style={styles.linkText}>LogIn</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  language: { position: 'absolute', top: 35, right: 20, borderWidth: 1, borderRadius: 20, overflow: 'hidden' },
  picker: { height: 55, width: 150 },
  topImgContainer: { flex: 1, alignItems: 'center', paddingTop: 70 },
  topImg: { width: 40, height: 60, resizeMode: 'contain' },
  mainImg: { width: 500, height: 280, resizeMode: 'contain', marginTop: 30 },
  textContainer: { alignItems: 'center', marginTop: 20, paddingHorizontal: 20 },
  heading: { fontSize: 28, fontWeight: '800', textAlign: 'center' },
  subHeading: { fontSize: 16, textAlign: 'center', marginTop: 10, lineHeight: 26 },
  options: { flexDirection: 'column', gap: 10, marginVertical: 20 },
  userButton: { backgroundColor: '#CD0201', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 50, borderWidth: 4, borderColor: '#CD0201', elevation: 3 },
  userButtonText: { color: 'white', fontWeight: 'bold', textAlign: 'center', fontSize: 16 },
  adminButton: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#000', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 50, elevation: 3 },
  adminButtonText: { fontWeight: 'bold', fontSize: 16, textAlign: 'center' },
  pressed: { backgroundColor: '#fff', borderWidth: 1, borderColor: "#000" },
  grayLine: { height: 1, backgroundColor: '#E7E7E7', width: '85%', alignSelf: 'center', marginVertical: 20 },
  loginContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', marginTop: 20 },
  normalText: { fontSize: 16, color: '#000', fontWeight: 500 },
  linkText: { fontSize: 16, color: '#CD0201', marginLeft: 5, fontWeight: 600 },
  inputContainer: { 
    width: '85%', 
    alignSelf: 'center', 
    marginVertical: 20 
  },
  input: { 
    borderWidth: 1, 
    borderColor: '#E7E7E7', 
    padding: 10, 
    borderRadius: 10, 
    marginBottom: 10 
  },
});
