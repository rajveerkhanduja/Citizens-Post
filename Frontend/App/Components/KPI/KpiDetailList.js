import React, { useState } from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import KpiDetailItem from "./KpiDetailItem";
import KpiDetailContent from "./KpiDetailContent";
import Colors from "../../Shared/Colors";

export default function KpiDetailList() {
  // Initializing KPI list values directly in this file
  const kpiDetailList = [
    { 
      id: 1,
      name: "Sukanya Samriddhi",
      value: "sukanya_samriddhi" 
    },
    { 
      id: 2,
      name: "Postal Network Reimagined",
      value: "postal_network_reimagined" 
    },
    { 
      id: 3, 
      name: "Mails", 
      value: "mails" 
    },
    { 
      id: 4, 
      name: "Citizen Centric Services", 
      value: "citizen_centric_services" 
    },
    { 
      id: 5, 
      name: "Aspirational Districts", 
      value: "aspirational_districts" 
    },
    { 
      id: 6, 
      name: "Public Grievances", 
      value: "public_grievances" 
    },
  ];

  // Setting the initial active category as the first item in the list
  const [activeCategory, setActiveCategory] = useState(kpiDetailList[0].id);

  const handleCategoryPress = (categoryId) => {
    setActiveCategory(categoryId); // Update the active category on press
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={kpiDetailList}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <KpiDetailItem
            category={item}
            isActive={activeCategory === item.id} // Check if the item is active
            onPress={() => handleCategoryPress(item.id)} // Handle press event
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      
      <KpiDetailContent activeCategory={activeCategory} /* cardData={cardData} */ />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    paddingHorizontal: 10,
  },
  listContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});