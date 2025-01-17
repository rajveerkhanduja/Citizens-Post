import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import TrackingComponent from "./TrackingComponent";
import GoogleMapView from "./GoogleMapView";
import GlobalApi from "../../Services/GlobalApi";

export default function TYS() {
  const navigation = useNavigation();
  const [parcelLocation, setParcelLocation] = useState({
    latitude: 23.022505, // Example parcel location (latitude)
    longitude: 72.571365, // Example parcel location (longitude)
  });
  const [destinationLocation, setDestinationLocation] = useState({
    latitude: 13.082680, // Example destination location (latitude)
    longitude: 80.270721, // Example destination location (longitude)
  });
  const [routeCoordinates, setRouteCoordinates] = useState([]);

  useEffect(() => {
    fetchRoute(parcelLocation, destinationLocation);
  }, [parcelLocation, destinationLocation]);

  const fetchRoute = async (origin, destination) => {
    try {
      const response = await GlobalApi.getRouteBetweenLocations(origin, destination);
      const points = decodePolyline(response.data.routes[0].overview_polyline.points);
      setRouteCoordinates(points);
    } catch (error) {
      console.error("Error fetching route:", error);
    }
  };

  const decodePolyline = (encoded) => {
    let points = [];
    let index = 0,
      lat = 0,
      lng = 0;

    while (index < encoded.length) {
      let b,
        shift = 0,
        result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const deltaLat = result & 1 ? ~(result >> 1) : result >> 1;
      lat += deltaLat;

      shift = 0;
      result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const deltaLng = result & 1 ? ~(result >> 1) : result >> 1;
      lng += deltaLng;

      points.push({ latitude: lat / 1e5, longitude: lng / 1e5 });
    }

    return points;
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContainer}>
      <LinearGradient colors={["#FFFFFF", "transparent"]}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.goBackButton}
            onPress={() => navigation.goBack()}
          >
            <View style={styles.goBackCircle}>
              <AntDesign name="arrowleft" size={24} color="white" />
            </View>
          </TouchableOpacity>
          <TrackingComponent />
        </View>
        {/* Google Map View */}
        <GoogleMapView
          parcelLocation={parcelLocation}
          destinationLocation={destinationLocation}
          routeCoordinates={routeCoordinates}
        />
      </LinearGradient>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 45,
    gap: 10,
  },
  goBackButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  goBackCircle: {
    backgroundColor: "#E63946",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
});