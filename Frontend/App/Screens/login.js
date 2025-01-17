import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Image, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform, Pressable, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import env from "dotenv";

env.config();

const Login = ({ navigation }) => {



  const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
  };

  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [isUser, setIsUser] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [selectedDivision, setSelectedDivision] = useState('CPMG');
  const [translations, setTranslations] = useState({
    loginNow: 'LogIn Now',
    enterDetails: 'Please enter your details',
    user: 'User',
    admin: 'Admin',
    phonePlaceholder: 'Phone number',
    passwordPlaceholder: 'Password',
    login: 'Log In',
    noAccount: "Don't have an account?",
    signUp: 'Sign Up',
  });

  const fetchTranslations = async (language) => {
    try {
      const textToTranslate = {
        loginNow: 'LogIn Now',
        enterDetails: 'Please enter your details',
        user: 'User',
        admin: 'Admin',
        phonePlaceholder: 'Phone number',
        passwordPlaceholder: 'Password',
        login: 'Log In',
        noAccount: "Don't have an account?",
        signUp: 'Sign Up',
      };

      const keys = Object.keys(textToTranslate);
      const translatedTexts = {};

      for (let key of keys) {
        const response = await fetch('https://translation-drab.vercel.app/api/translation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text: textToTranslate[key],
            targetLang: language.toLowerCase().slice(0, 2),
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch translations');
        }

        const result = await response.json();
        translatedTexts[key] = result.translatedText || textToTranslate[key];
      }

      setTranslations(translatedTexts);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  useEffect(() => {
    fetchTranslations(selectedLanguage);
  }, [selectedLanguage]);

  const dummyLoginVerification = () => {
    const dummyCredentials = {
      phoneNumber: '9876543210',
      password: 'Password',
    };

    if (phoneNumber === dummyCredentials.phoneNumber && password === dummyCredentials.password) {
      handleLogin();
    } else {
      Alert.alert('Login Failed', 'Invalid phone number or password.');
    }
  };

  const handleLogin = () => {
    if (isUser) {
      navigation.navigate('DrawerNavigator');
    } else {
      if (selectedDivision === 'Circle') {
        navigation.navigate('CircleTabNavigator');
      } else if (selectedDivision === 'CPMG') {
        navigation.navigate('CPMGTabNavigator');
      } else if (selectedDivision === 'Regional') {
        navigation.navigate('RegionalTabNavigator');
      } else if (selectedDivision === 'Divison') {
        navigation.navigate('DivisionTabNavigator');
      }
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.language}>
          <Picker selectedValue={selectedLanguage} onValueChange={setSelectedLanguage} style={styles.picker} dropdownIconColor="#000">
            <Picker.Item label="English" value="English" />
            <Picker.Item label="Hindi" value="Hindi" />
            <Picker.Item label="Telugu" value="Telugu" />
            <Picker.Item label="Tamil" value="Tamil" />
          </Picker>
        </View>

        <View style={styles.topImgContainer}>
          <Image source={require('../../assets/opening_top.png')} style={styles.topImg} />
          <Image source={require('../../assets/login-image.png')} style={styles.mainImg} />
          <View style={styles.textContainer}>
            <Text style={styles.heading}>{translations.loginNow}</Text>
            <Text style={styles.subHeading}>{translations.enterDetails}</Text>
          </View>

          <View style={styles.toggleContainer}>
            <View style={styles.toggleWrapper}>
              <TouchableOpacity
                style={[styles.toggleOption, isUser && styles.selected]}
                onPress={() => setIsUser(true)}>
                <Text style={[styles.toggleText, isUser && styles.selectedText]}>{translations.user}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.toggleOption, !isUser && styles.selected]}
                onPress={() => setIsUser(false)}>
                <Text style={[styles.toggleText, !isUser && styles.selectedText]}>{translations.admin}</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.slider, !isUser && { left: '50%' }]} />
          </View>

          <View style={styles.inputContainer}>
            {!isUser && (
              <View style={styles.divisionContainer}>
                <Text style={styles.label}>Select Division:</Text>
                <View style={{ borderWidth: 1, borderRadius: 100 }}>
                  <Picker
                    selectedValue={selectedDivision}
                    onValueChange={(itemValue) => setSelectedDivision(itemValue)}
                    style={styles.inputPicker}
                  >
                    <Picker.Item label="CPMG" value="CPMG" />
                    <Picker.Item label="Circle" value="Circle" />
                    <Picker.Item label="Regional" value="Regional" />
                    <Picker.Item label="Divison" value="Divison" />
                  </Picker>
                </View>
              </View>
            )}

            <TextInput style={styles.input} placeholder={translations.phonePlaceholder} value={phoneNumber} onChangeText={setPhoneNumber} keyboardType="phone-pad" />
            <TextInput style={styles.input} placeholder={translations.passwordPlaceholder} value={password} onChangeText={setPassword} secureTextEntry />

            <TouchableOpacity style={styles.loginButton} onPress={dummyLoginVerification}>
              <Text style={styles.loginButtonText}>{translations.login}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.grayLine}></View>

          <View style={styles.loginContainer}>
            <Text style={styles.normalText}>{translations.noAccount}</Text>
            <Pressable onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.linkText}>{translations.signUp}</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: { flex: 1 },
  language: { position: 'absolute', top: 35, right: 20, borderWidth: 1, borderColor: '#000', borderRadius: 20, backgroundColor: 'transparent', overflow: 'hidden' },
  picker: { height: 55, width: 150 },
  topImgContainer: { flex: 1, alignItems: 'center', justifyContent: 'flex-start', paddingTop: 70 },
  topImg: { width: 40, height: 60, resizeMode: 'contain' },
  mainImg: { width: 500, height: 250, resizeMode: 'contain', marginTop: 30 },
  textContainer: { alignItems: 'center', marginTop: 20, paddingHorizontal: 20 },
  heading: { fontSize: 28, fontWeight: '800', textAlign: 'center' },
  subHeading: { fontSize: 16, textAlign: 'center', marginTop: 10, lineHeight: 26 },
  toggleContainer: { flexDirection: 'row', marginTop: 10, alignItems: 'center', justifyContent: 'center', position: 'relative', width: '50%', height: 50 },
  toggleWrapper: { flexDirection: 'row', backgroundColor: '#f0f0f0', borderRadius: 50, overflow: 'hidden', width: '100%', borderWidth: 1 },
  toggleOption: { flex: 1, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#ddd', paddingVertical: 5 },
  toggleText: { fontSize: 16, color: '#000' },
  selected: { backgroundColor: '#d32f2f' },
  selectedText: { color: '#fff' },
  slider: { position: 'absolute', bottom: 0, width: '50%', height: '100%', backgroundColor: 'transparent', borderRadius: 20, transition: 'left 0.3s ease' },
  inputContainer: { width: '80%', marginTop: 10, paddingHorizontal: 10, alignItems: 'center' },
  inputPicker: { height: 55, width: "100%", borderWidth: 1, borderRadius: 50, marginBottom: 5, paddingHorizontal: 10, borderColor: "#000000" },
  input: { height: 50, width: "100%", borderWidth: 1, borderRadius: 50, marginBottom: 20, paddingHorizontal: 10, borderColor: "#000000" },
  divisionContainer: { marginBottom: 20, width: '100%' },
  label: { marginBottom: 5 },
  loginButton: { backgroundColor: '#d32f2f', width: '100%', height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 50, marginTop: 20 },
  loginButtonText: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
  grayLine: { height: 1, width: '80%', backgroundColor: '#ccc', marginVertical: 20 },
  loginContainer: { flexDirection: 'row', alignItems: 'center' },
  normalText: { fontSize: 14, marginRight: 5 },
  linkText: { fontSize: 14, color: '#d32f2f' },
});
