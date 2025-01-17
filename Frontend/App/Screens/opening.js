import React from 'react';
import { Pressable, StyleSheet, View, Text, Image, SafeAreaView } from 'react-native';




export default function OpeningPage({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topImgContainer}>
        <Image source={require('../../assets/opening_top.png')} style={styles.topImg} />
        <Image source={require('../../assets/opening_main.png')} style={styles.mainImg} />

        <View style={styles.textContainer}>
          <Text style={styles.heading}>Empowering Citizens</Text>
          <Text style={styles.subHeading}>
            Easily Track and Improve Citizens’ Charter Compliance Across Regions
          </Text>
        </View>

        <Image source={require('../../assets/opening_bottom.png')} style={styles.bottomImg} />

        {/* Styled Pressable Button */}
        <Pressable style={styles.button} onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.buttonText}>Get Started</Text>
        </Pressable>

        <View style = {styles.grayLine}></View>

        <View style = {styles.loginContainer}>
          <Text style = {styles.normalText}>Already have a account?</Text>
          <Pressable onPress={() => navigation.navigate('Login')}>
            <Text style={styles.linkText}>LogIn</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1, // SafeAreaView takes up the full screen
    backgroundColor: '#fff', // Optional: Background color
  },
  topImgContainer: {
    flex: 1, // Dynamically adjust height based on content
    alignItems: 'center', // Center images and text horizontally
    justifyContent: 'flex-start', // Align content to the top
    paddingTop: 70, // Maintain original padding from the top
  },
  topImg: {
    width: 40, // Maintain original image width
    height: 60, // Maintain original image height
    resizeMode: 'contain', // Ensure the image scales properly without clipping
  },
  mainImg: {
    width: 500, // Maintain original image width
    height: 280, // Maintain original image height
    resizeMode: 'contain',
    marginTop: 30, // Maintain original spacing between images
  },
  textContainer: {
    alignItems: 'center', // Center text horizontally
    marginTop: 20, // Space between the image and text
    paddingHorizontal: 20, // Add padding for better text alignment
  },
  heading: {
    fontSize: 28, // Keep large font size
    fontWeight: '800', // Bold text
    textAlign: 'center', // Center-align the text
  },
  subHeading: {
    fontSize: 16, // Adjust font size for readability
    textAlign: 'center', // Center-align the text
    marginTop: 10, // Space between heading and subheading
    lineHeight: 26, // Add line spacing for better readability
  },
  bottomImg:{
    marginTop: 30
  },
  button:{
    backgroundColor: "#CD0201",
    width: 240,
    height:70,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    borderRadius:100
  },
  buttonText:{
    fontSize: 20,
    color:"#fff",
    fontWeight:500
  },
  grayLine:{
    height: 1, // Thickness of the line
    backgroundColor: '#E7E7E7', // Gray color for the line
    width: '85%', // Adjust width to fit the layout
    alignSelf: 'center', // Center the line horizontally
    marginVertical: 20, // Space above and below the line
  },

  loginContainer: {
    flexDirection: 'row', // Places the texts side by side
    justifyContent: 'center', // Center the texts on smaller screens
    alignItems: 'center', // Vertically center the texts
    flexWrap: 'wrap', // Allows wrapping to the next line if space is limited
    marginTop: 20, // Adds spacing above the container
  },
  normalText: {
    fontSize: 16, // Adjust font size
    color: '#000',
    fontWeight:500 // Normal text color
  },
  linkText: {
    fontSize: 16, // Same font size as the normal text
    color: '#CD0201', // Link color (blue)
    marginLeft: 5, // Adds space between the two texts
    fontWeight:600, // Makes the link text bold
  },
});
