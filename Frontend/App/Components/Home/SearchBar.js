import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../Shared/Colors";
import Subtract from "./Subtract";

export default function SearchBar() {
  return (
    <View style={styles.searchBar}>
      {/* Search Input */}
      <TextInput
        placeholder="Search"
        style={styles.textInput}
      />
      {/* Search Icon */}
      <Ionicons name="search" size={24} color={Colors.DARK_GRAY} />
    </View>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    paddingHorizontal: 10,
    elevation: 1, // for slight shadow
    margin:10,
    height:50,
  },
  textInput: {
    flex: 1,
    marginRight: 10, // Add spacing between the text input and the icon
  },
});