import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Colors from "../../Shared/Colors";
import AntDesign from '@expo/vector-icons/AntDesign';
import SupportOptions from "./SupportOptions";

export default function KpiDetail() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.goBackButton}
          onPress={() => navigation.goBack()}
        >
          <View style={styles.goBackCircle}>
          <AntDesign name="arrowleft" size={24} color="white" />
          </View>
          <Text style={styles.goBackText}>Go Back</Text>
        </TouchableOpacity>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>Rakesh Kumar</Text>
          <Text style={styles.userLocation}>Guntur</Text>
        </View>
        <Image
          style={styles.profileImage}
          source={require("./../../../assets/user.png")}
        />
      </View>

      
      <View style={styles.content}>
        <Text style={styles.headerText}>Help & Support</Text>
      </View>
      <SupportOptions/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  header: {
    backgroundColor: Colors.WHITE, 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    height: 60,
    marginTop: 45,
  },
  userInfo: {
    flex: 4,
    alignItems: 'flex-end',
  },
  userName: {
    color: 'BLACK',
    fontSize: 16,
    fontWeight: 'bold',
  },
  userLocation: {
    color: 'black',
    fontSize: 14,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 10,
  },
  goBackButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  goBackCircle: {
    backgroundColor: Colors.RED || "#E63946",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  goBackText: {
    fontSize: 16,
    color: "#000",
    fontWeight: "600",
  },
  content: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  headerText: {
    fontSize: 30,
    fontWeight: "600",
    marginBottom: 10,
    color: "#000",
  },
});