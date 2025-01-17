import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';

const languages = [
  { id: '1', name: 'English' },
  { id: '2', name: 'Hindi' },
  { id: '3', name: 'Assamese' },
  { id: '4', name: 'Bengali' },
  { id: '5', name: 'Bodo' },
  { id: '6', name: 'Dogri' },
  { id: '7', name: 'Gujarati' },
  { id: '8', name: 'Kannada' },
  { id: '9', name: 'Kashmiri' },
  { id: '10', name: 'Konkani' },
  { id: '11', name: 'Maithili' },
  { id: '12', name: 'Malayalam' },
  { id: '13', name: 'Manipuri' },
  { id: '14', name: 'Marathi' },
  { id: '15', name: 'Nepali' },
  { id: '16', name: 'Odia' },
  { id: '17', name: 'Punjabi' },
  { id: '18', name: 'Sanskrit' },
  { id: '19', name: 'Santali' },
  { id: '20', name: 'Sindhi' },
  { id: '21', name: 'Tamil' },
  { id: '22', name: 'Telugu' },
  { id: '23', name: 'Urdu' },
];

const App = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]); // Default to English
  console.log(selectedLanguage)
  const [showDone, setShowDone] = useState(false);

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    setShowDone(true); // Show Done button after a language is selected
  };

  const handleDone = () => {
    alert(`You selected: ${selectedLanguage.name}`);
    // You can add logic to store the selected language or navigate
  };

  const renderLanguageItem = ({ item }) => (
    <TouchableOpacity
      style={styles.languageItem}
      onPress={() => handleLanguageSelect(item)}
    >
      <Text style={styles.languageText}>{item.name}</Text>
      {selectedLanguage?.id === item.id && (
        <Image
          source={require('../../../assets/tick.png')} // Path to your tick image
          style={styles.checkmark}
        />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.banner}>
        <Text style={styles.bannerText}>Welcome! Please select Language</Text>
      </View>

      <FlatList
        data={languages}
        renderItem={renderLanguageItem}
        keyExtractor={(item) => item.id}
      />

      {showDone && (
        <TouchableOpacity
          style={styles.doneButton}
          onPress={handleDone}
        >
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 120,
  },
  banner: {
    backgroundColor: '#D73736',
    padding: 20,
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  bannerText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  languageItem: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  languageText: {
    fontSize: 18,
  },
  checkmark: {
    width: 20,   // Adjust based on your image size
    height: 20,  // Adjust based on your image size
    resizeMode: 'contain', // Ensures the image doesn't stretch
  },
  doneButton: {
    backgroundColor: '#D73736',
    padding: 15,
    margin: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  doneButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default App;
