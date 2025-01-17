import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import React from 'react';
import CountContainer from "../../../DopComponents/DOP-KPI/CountContainer.js";
import SimplifiedPerformance from "../../../DopComponents/Home/SimplifiedPerformance.js";

import UserFeedback from "../../../DopComponents/DOP-KPI/UserFeedback.js"

export default function DOPHome() {
  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <Image source={require('../../../../assets/DOP Banner.png')} style={styles.image} />
      <CountContainer />
      <SimplifiedPerformance/>
      <UserFeedback/>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20, // Adds padding at the bottom for better scroll experience
  },
  image: {
    width: '100%',
    height: 150,
  },
});