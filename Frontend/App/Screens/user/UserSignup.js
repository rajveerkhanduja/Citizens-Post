import { StyleSheet, Text, View, KeyboardAvoidingView, ScrollView, TextInput, TouchableOpacity, Pressable, Image, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';

export default function UserSignup({ navigation }) {
    const [selectedLanguage, setSelectedLanguage] = useState('English');



    const [fullName, setFullName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.language}>
                    <Picker selectedValue={selectedLanguage} onValueChange={setSelectedLanguage} style={styles.picker}>
                        {['English', 'Hindi', 'Spanish', 'French'].map((lang) => (
                            <Picker.Item label={lang} value={lang} key={lang} />
                        ))}
                    </Picker>
                </View>

                <View style={styles.topImgContainer}>
                    <Image source={require('../../../assets/signupFormImg.png')} style={styles.topImg} />
                    <View style={styles.textContainer}>
                        <Text style={styles.heading}>Sign Up</Text>
                        <Text style={styles.subHeading}>Please enter your details</Text>
                    </View>

                    <View style={styles.inputContainer}>
                        <Text>Full Name</Text>
                        <TextInput style={styles.input} placeholder="Full Name" value={fullName} onChangeText={setFullName} />

                        <Text>Email Address</Text>
                        <TextInput style={styles.input} placeholder="Email" value={emailAddress} onChangeText={setEmailAddress} keyboardType="email-address" />

                        <Text>Phone Number</Text>
                        <TextInput style={styles.input} placeholder="Phone" value={phoneNumber} onChangeText={setPhoneNumber} keyboardType="phone-pad" />

                        <Text>Password</Text>
                        <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />

                        <Text>Confirm Password</Text>
                        <TextInput style={styles.input} placeholder="Confirm Password" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />

                    </View>

                    <View style = {styles.buttonContainer}>
                        <TouchableOpacity style={styles.loginButton}><Text style={styles.loginButtonText}>Signup</Text></TouchableOpacity>
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
    scrollView: { flexGrow: 1 },
    language: { position: 'absolute', top: 35, right: 20, borderWidth: 1, borderColor: '#000', borderRadius: 20, overflow: 'hidden' },
    picker: { height: 55, width: 150 },
    topImgContainer: { flex: 1, alignItems: 'center', justifyContent: 'flex-start', paddingTop: 70 },
    topImg: { width: 140, height: 160, resizeMode: 'contain' },
    textContainer: { alignItems: 'center', marginTop: 20, paddingHorizontal: 20 },
    heading: { fontSize: 28, fontWeight: '800', textAlign: 'center' },
    subHeading: { fontSize: 16, textAlign: 'center', marginTop: 10, lineHeight: 26 },
    inputContainer: { width: '80%', marginTop: 10, paddingHorizontal: 10},
    input: { height: 50, width: "100%", borderWidth: 2, borderColor: "#000000", borderRadius: 50, marginBottom: 10, paddingHorizontal: 10 },
    buttonContainer :{width: "100%", alignItems:"center"},
    loginButton: { backgroundColor: '#d32f2f', height: 50, width: "50%", justifyContent: 'center', alignItems: 'center', borderRadius: 50 },
    loginButtonText: { color: '#fff', fontSize: 16 },
    grayLine: { height: 1, backgroundColor: '#E7E7E7', width: '85%', alignSelf: 'center', marginVertical: 20 },
    loginContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', marginTop: 0 },
    normalText: { fontSize: 16, color: '#000', fontWeight: 500 },
    linkText: { fontSize: 16, color: '#CD0201', marginLeft: 5, fontWeight: 600 },
});
