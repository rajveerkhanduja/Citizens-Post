import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const LogoutHandler = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // Perform logout actions here, e.g., clearing user data
    console.log('User logged out'); // Replace with your logout logic

    // Redirect to Login screen
    navigation.replace('Login');
  }, [navigation]);

  return null; // No UI required
};

export default LogoutHandler;
