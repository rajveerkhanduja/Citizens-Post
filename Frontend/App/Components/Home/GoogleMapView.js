import React, { useContext, useEffect, useState } from "react";
import { View, Text, Dimensions, ActivityIndicator } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import GlobalApi from "../../Services/GlobalApi";
import { UserLocationContext } from "../../Context/UserLocationContext";

export default function GoogleMapView() {
  const [mapRegion, setMapRegion] = useState(null);
  const [postOffices, setPostOffices] = useState([]);
  const [loading, setLoading] = useState(true);
  const { location } = useContext(UserLocationContext);

  useEffect(() => {
    if (location?.coords) {
      const { latitude, longitude } = location.coords;
      setMapRegion({
        latitude,
        longitude,
        latitudeDelta: 0.0322,
        longitudeDelta: 0.0421,
      });
      fetchNearbyPostOffices(latitude, longitude);
    } else {
      console.warn("Location is not available");
      setLoading(false);
    }
  }, [location]);

  const fetchNearbyPostOffices = async (latitude, longitude) => {
    try {
      setLoading(true);
      const response = await GlobalApi.nearByPostalServices(latitude, longitude);
      const results = response.data.results || [];
      setPostOffices(results); // Ensure results are valid
    } catch (error) {
      console.error("Error fetching nearby post offices:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ marginTop: 20 }}>
      <View
        style={{
          borderRadius: 20,
          overflow: "hidden",
        }}
      >
        {loading ? (
          <View style={{ alignItems: "center", justifyContent: "center", height: "100%" }}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text>Loading map...</Text>
          </View>
        ) : location ? (
          <MapView
            style={{
              width: Dimensions.get("screen").width * 0.91,
              height: Dimensions.get("screen").height * 0.23,
            }}
            provider={PROVIDER_GOOGLE}
            showsUserLocation={true}
            region={mapRegion}
          >
            {/* User's Location */}
            {mapRegion && (
              <Marker
                title="You"
                coordinate={{
                  latitude: mapRegion.latitude,
                  longitude: mapRegion.longitude,
                }}
                pinColor="blue"
              />
            )}

            {/* Post Office Markers */}
            {postOffices.map((office, index) => (
              <Marker
                key={index}
                title={office.name}
                description={office.vicinity}
                coordinate={{
                  latitude: office.geometry.location.lat,
                  longitude: office.geometry.location.lng,
                }}
              />
            ))}
          </MapView>
        ) : (
          <Text style={{ textAlign: "center", marginTop: 20 }}>Location not available</Text>
        )}
      </View>
    </View>
  );
}