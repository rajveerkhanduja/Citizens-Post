import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';

export default function Subtract() {
  const { width } = Dimensions.get('window'); // Get the screen width

  return (
    <View style={[styles.container, { width }]}>
      <Image
        source={require('./../../../assets/Subtract.png')}
        style={[styles.image, { width }]} // Make image width match the screen width
      />
    </View>
  );
}

const styles = StyleSheet.create({
});