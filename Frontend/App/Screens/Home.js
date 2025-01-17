import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, FlatList } from "react-native";
import SearchBar from "../Components/Home/SearchBar";
import Colors from "../Shared/Colors";
import OtherServicesList from "../Components/Home/OtherServicesList";
import PerformanceDashboardList from "../Components/Home/PerformanceDashboardList";
import Subtract from "../Components/Home/Subtract";
import RegionalData from "../Components/Stats/RegionalData.js";
import ComplaintDetails from "../Components/Stats/ComplaitDetails.js";
import GoogleMapView from "../Components/Home/GoogleMapView.js";

export default function Home({ navigation }) {
  return (
    <FlatList
      data={[{}]} // Dummy data to render a single list item
      renderItem={() => (
        <View>
          <View style={styles.searchBarContainer}>
            <SearchBar />
          </View>
          <Subtract />
          <PerformanceDashboardList />
          <View style={styles.postOfficeContainer}>
            {/* Title and Button */}
            <View style={styles.headerRow}>
              <Text style={styles.title}>Nearby Post Offices</Text>
              <TouchableOpacity
                style={styles.detailsButton}
                onPress={() => navigation.navigate("Location")}
              >
                <Text style={styles.detailsButtonText}>See Details</Text>
              </TouchableOpacity>
            </View>
            {/* Subheading */}
            <Text style={styles.subheading}>
            Find nearby post offices and explore their services.
            </Text>
            {/* Google Map */}
            <GoogleMapView />
          </View>
          <OtherServicesList />
          <RegionalData />
          <ComplaintDetails />
        </View>
      )}
      keyExtractor={(item, index) => index.toString()}
      style={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBarContainer: {
    padding: 10,
    backgroundColor: Colors.SECOND_PRIMARY,
  },
  postOfficeContainer: {
    padding: 10,
    margin: 8,
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
  },
  subheading: {
    fontSize: 12,
    color: Colors.DARK_GRAY,
    lineHeight: 18, // Adjust line height for better readability
  },
  detailsButton: {
    backgroundColor: Colors.WHITE,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderColor:Colors.BLACK,
    borderWidth:1
  },
  detailsButtonText: {
    color: Colors.BLACK,
    fontSize: 14,
    fontWeight: "bold",
  },
});