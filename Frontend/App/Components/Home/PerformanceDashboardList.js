import React from "react";
import { View, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import PerformanceDashboardItem from "./PerformanceDashboardItem";

export default function PerformanceDashboardList() {
  const navigation = useNavigation();

  const performanceDashboardList = [
    {
      id: 1,
      name: "KPI",
      value: "kpi",
      icon: require("../../../assets/kpi.png"), // Adjust this path
    },
    {
      id: 2,
      name: "Track Your Service",
      value: "track_your_service",
      icon: require("../../../assets/image (3).png"), // Adjust this path
    },
    {
      id: 3,
      name: "Know Your Services",
      value: "know_your_services",
      icon: require("../../../assets/service.png"), // Adjust this path
    },
    {
      id: 4,
      name: "Help and Support",
      value: "help_and_support",
      icon: require("../../../assets/image (5).png"), // Adjust this path
    },
    
  ];

  const handleItemPress = (item) => {
    if (item.value === "kpi") {
      navigation.navigate('KpiDashboard', {
        screen: 'kpi-detail',
      });
    }
    else if (item.value === "help_and_support"){
      navigation.navigate("HelpSupport",{
        screen: 'Help-Support',
      })
    }
    else if (item.value === "track_your_service") {
      navigation.navigate("TrackYourService");
    }
    else if (item.value === "track_your_service") {
      navigation.navigate("TrackYourService");
    }

    else if (item.value === "know_your_services") {
      navigation.navigate("YourServices");
    }
  };

  return (
    <FlatList
      data={performanceDashboardList}
      numColumns={4}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => handleItemPress(item)}
        style={styles.itemWrapper}>
          <PerformanceDashboardItem category={item} />
        </TouchableOpacity>
      )}
      contentContainerStyle={styles.listContainer}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    justifyContent: "center",
    flexDirection:"row",
  },
  itemWrapper: {
    flex: 1, // Ensures items take up equal space
    alignItems: "center",
    margin: 20,
    padding: 10,
  },
});