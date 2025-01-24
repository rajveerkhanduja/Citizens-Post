// 1. First, install required dependencies
// npm install @react-native-firebase/app @react-native-firebase/auth react-native-phone-input

import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  Button, 
  StyleSheet, 
  Alert 
} from 'react-native';
import auth from '@react-native-firebase/auth';
import PhoneInput from 'react-native-phone-input';

const PhoneAuthScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [confirmResult, setConfirmResult] = useState(null);
  const [verificationCode, setVerificationCode] = useState('');

  // Step 1: Send OTP
  const sendVerificationCode = async () => {
    try {
      const phoneNumberWithCountryCode = phoneNumber.replace(/\s/g, '');
      
      const confirmation = await auth().signInWithPhoneNumber(
        phoneNumberWithCountryCode
      );
      
      setConfirmResult(confirmation);
      Alert.alert('Verification Code Sent', 'Please check your phone');
    } catch (error) {
      console.error('Phone Auth Error:', error);
      Alert.alert('Error', 'Failed to send verification code');
    }
  };

  // Step 2: Verify OTP
  const confirmVerificationCode = async () => {
    try {
      if (!confirmResult || !verificationCode) {
        Alert.alert('Error', 'Please enter verification code');
        return;
      }

      const credential = await confirmResult.confirm(verificationCode);
      
      // User successfully signed in
      const user = credential.user;
      Alert.alert('Success', `Logged in with phone number: ${user.phoneNumber}`);
    } catch (error) {
      console.error('Verification Error:', error);
      Alert.alert('Error', 'Invalid verification code');
    }
  };

  return (
    <View style={styles.container}>
      {!confirmResult ? (
        // Phone Number Input Stage
        <View>
          <PhoneInput
            initialCountry="us"
            onChangePhoneNumber={(number) => setPhoneNumber(number)}
            style={styles.phoneInput}
          />
          <Button 
            title="Send Verification Code" 
            onPress={sendVerificationCode} 
          />
        </View>
      ) : (
        // OTP Verification Stage
        <View>
          <TextInput
            placeholder="Enter 6-digit code"
            value={verificationCode}
            onChangeText={setVerificationCode}
            keyboardType="numeric"
            maxLength={6}
            style={styles.input}
          />
          <Button 
            title="Confirm Verification Code" 
            onPress={confirmVerificationCode} 
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  phoneInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    padding: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    padding: 10,
  }
});

export default PhoneAuthScreen;

// Firebase Configuration (add to your firebase.js or app's config)
// import firebase from '@react-native-firebase/app';

// const firebaseConfig = {
//   apiKey: "YOUR_API_KEY",
//   authDomain: "YOUR_AUTH_DOMAIN",
//   projectId: "YOUR_PROJECT_ID",
//   // other configuration
// };

// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }