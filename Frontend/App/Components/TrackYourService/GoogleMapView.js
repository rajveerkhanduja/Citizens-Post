import React, { useState, useEffect } from "react";
import { View, Text, Dimensions } from "react-native";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";

export default function GoogleMapView({ parcelLocation, destinationLocation, routeCoordinates }) {
  const [mapRegion, setMapRegion] = useState(null);

  useEffect(() => {
    // Set the region to be centered between the parcel and destination locations
    if (parcelLocation && destinationLocation) {
      const latitude = (parcelLocation.latitude + destinationLocation.latitude) / 2;
      const longitude = (parcelLocation.longitude + destinationLocation.longitude) / 2;
      setMapRegion({
        latitude,
        longitude,
        latitudeDelta: 0.422,
        longitudeDelta: 0.121,
      });
    }
  }, [parcelLocation, destinationLocation]);

  return (
    <View>
      {mapRegion ? (
        <MapView
          style={{
            width: Dimensions.get("screen").width,
            height: Dimensions.get("screen").height * 0.9,
          }}
          provider={PROVIDER_GOOGLE}
          region={mapRegion}
          showsUserLocation={false} // Disable user's location
        >
          {/* Parcel's Location */}
          {parcelLocation && (
            <Marker
              title="Parcel"
              coordinate={parcelLocation}
              pinColor="green"
            />
          )}

          {/* Destination Location */}
          {destinationLocation && (
            <Marker
              title="Destination"
              coordinate={destinationLocation}
              pinColor="red"
            />
          )}

          {/* Route Polyline */}
          {routeCoordinates.length > 0 && (
            <Polyline
              coordinates={routeCoordinates}
              strokeColor="blue" // Route line color
              strokeWidth={4}    // Line width
            />
          )}
        </MapView>
      ) : (
        <Text>Loading map...</Text>
      )}
    </View>
  );
}