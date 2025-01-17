import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import Colors from "../../Shared/Colors.js";

const KpiDetailItem = ({ category, isActive, onPress }) => {
  return (
    <TouchableOpacity
      style={[
        styles.itemContainer,
        isActive ? styles.activeItemContainer : styles.inactiveItemContainer,
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.name,
          isActive ? styles.activeText : styles.inactiveText,
        ]}
      >
        {category.name}
      </Text>
    </TouchableOpacity>
  );
};

export default KpiDetailItem;

const styles = StyleSheet.create({
  itemContainer: {
    margin: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  activeItemContainer: {
    backgroundColor: Colors.SECOND_PRIMARY,
  },
  inactiveItemContainer: {
    backgroundColor: Colors.WHITE,
    borderWidth: 1,
    borderColor: Colors.GRAY,
  },
  name: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  activeText: {
    color: Colors.WHITE,
  },
  inactiveText: {
    color: Colors.BLACK,
  },
});