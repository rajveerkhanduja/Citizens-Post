import React, { useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import SupportSelected from "./SupportSelected.js";
import SupportContents from "./SupportContents.js"
import Complaint from "./CustomerSupport.js";

export default function KpiDetailList() {
  const kpiDetailList = [
    { id: 1, name: "Complaints", value: "Complaints" },
    { id: 2, name: "FAQ's", value: "faqs" },
    { id: 3, name: "Customer Support", value: "Customer_Support" },
  ];

  const [activeCategory, setActiveCategory] = useState(kpiDetailList[0].id);

  const handleCategoryPress = (categoryId) => {
    setActiveCategory(categoryId);
  };

  return (
    <View style={styles.container}>
      {/* Top List */}
      <View style={styles.listWrapper}>
        <FlatList
          data={kpiDetailList}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <SupportSelected
              category={item}
              isActive={activeCategory === item.id}
              onPress={() => handleCategoryPress(item.id)}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>

      {/* Main Complaint Section */}
      <View style={styles.complaintWrapper}>
        <SupportContents activeCategory={activeCategory} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Full height of the screen
    backgroundColor: "#f9f9f9",
  },
  listWrapper: {
    height: 60, // Set a fixed height for the top list
    justifyContent: "center",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  listContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  complaintWrapper: {
    flex: 1, // Remaining space for the complaint section
    padding: 10,
  },
});
