import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import RNPickerSelect from 'react-native-picker-select';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function YourServices() {
  const [searchText, setSearchText] = useState('');
  const [language, setLanguage] = useState('en'); // default language is English
  const [translations, setTranslations] = useState([]);
  const navigation = useNavigation();

  const serviceData = [
    {
      id: '1',
      title: 'Service Standards',
      description: `Mail/Money order:\nTime from posting/booking to delivery\n\nDelivery of First Class Mail & Registered Letter:\nLocal | Metro-Metro | Same state | State Capital to State Capital | Rest of the country\n\nDelivery of Speed Post articles:\nLocal | Metro-Metro | Same state | State Capital to State Capital | Rest of the country\n\nDelivery of Express Parcel:\nLocal | Metro-Metro | Same state | State Capital to State Capital | Rest of the country\n\nDelivery of Business Parcel & Second Class Mail:\nLocal | Metro-Metro | Same state | State Capital to State Capital | Rest of the country`,
      backgroundColor: '#fafc68',
      navigateTo: "ServiceStandards",
    },
    {
      id: '2',
      title: 'Countrywise Services',
      description: `Country:          Services Standard (Days)\n\nAfghanistan                       3-7 Days\nArgentina                           5-9 Days\nAustralia                            4-8 Days\nAustria                               4-8 Days\nBahrain                              4-8 Days\nBarbados                           3-7 Days\nBelarus                               5-9 Days\nBelgium                              4-8 Days\nBermuda:                           4-8 Days`,
      backgroundColor: '#b6f9f5',
      navigateTo: "countryWise",
    },
    {
      id: '3',
      title: 'Financial Services',
      description: `Money Remittance:\nTime from booking to transfer/payment\n\nInstant Money Order:\nPayment on the same day\n\nDelivery of Money Order:\nLocal* and between Metro Cities** Local - within Municipal City limits * Metro - Delhi, Mumbai, Kolkata, Chennai, Hyderabad, and Bengaluru | Rest of India\n\nInternational Money Transfer Service:\nPayment on production of code and required documents`,
      backgroundColor: '#98FB98',
      navigateTo: "financialServices",
    },
    {
      id: '4',
      title: 'Post Office Savings Bank (Non-CBS)',
      description: `Transfer of Accounts:\nWithin the same Head Post Office | Between two different head post offices.\n\nSettlement of customer requests:\nTime taken for settlement starting from the time of receipt of completed documents.\n\nDischarge of Savings:\nTime taken for settlement starting from the time of receipt of completed documents.\n\nTransfer of Savings Certificate:\nTime taken from the receipt of application for transfer at the post office.\n\nIssue of Duplicate Certificate:\nTime taken from the receipt of application along with required documents at the post office of issue of the certificate | Involving investigation.`,
      backgroundColor: '#c0bdf7',
      navigateTo: "PostOfficeSavingsBank",
    },
    {
      id: '5',
      title: 'Post Office Savings Bank (CBS)',
      description: `Transfer of Accounts:\nRequest at any Head Post Office\n\nDeceased claim with nomination:\nIf presented at Head Post Office (HO) or Sub Post Office (SO) (except time scale SO)\n\nDeceased claim without nomination:\nIf presented at HO or SO and within powers of HO or SO\n\nIssue of Duplicate Passbook:\nWhen presented at any HO or SO\n\nInterest Posting:\nCertificates at post office other than the office of purchase`,
      backgroundColor: '#edbdf7',
      navigateTo: "PostOfficeSavingsBankCBS",
    },
    {
      id: '6',
      title: 'Postal Life Insurance and Rural Postal Life Insurance',
      description: `Issue of acceptance Letter/Policy Bond:\nTime taken from the receipt of completed documents\n\nMaturity claim settlement/Paid-up value of policy/Survival Benefit payment:\nTime taken from the receipt of completed documents\n\nSettlement of PLI/RPLI death claims:\nWith/Without nomination (Time taken from the receipt of completed documents)\n\nRevival of policy:\nConversion of policy:\nTime taken from the receipt of completed documents`,
      backgroundColor: '#E6E6FA',
      navigateTo: "insurance",
    },
    {
      id: '7',
      title: 'Counter Services including Philately',
      description: `Issue of My stamp at Philately Bureau:\nService Standards of various services for Branch Office\n\nSale of Stamps and stationery:\nTransaction Time at Branch Office\n\nMiscellaneous Services:\n- Booking of Registered Articles\n- Booking of Money Orders\n- Collection and Payment of PLI premia\n- Post Office Savings Bank Deposit\n- Post Office Savings Bank Withdrawals up to Rs. 5000/-\nTransaction Time at Branch Office`,
      backgroundColor: '#bdf7e1',
      navigateTo: "stamp",
    },
    {
      id: '8',
      title: 'Public Grievance Redressal Standards',
      description: `Issue of Acknowledgement of complaint:\nOn the day of receipt itself\n\nSettlement of Complaints:\nTime from lodging of complaint\n\nSettlement of complaint in cases requiring investigation:\nTime from lodging of complaint`,
      backgroundColor: '#f7bde3',
      navigateTo: "ServiceStandardsofPublicGrievanceRedress",
    },
  ];

  const handleSearch = (text) => {
    setSearchText(text);
  };

  const filteredData = serviceData.filter((item) => {
    const searchQuery = searchText.toLowerCase();
    return (
      item.title.toLowerCase().includes(searchQuery) ||
      item.description.toLowerCase().includes(searchQuery)
    );
  });

  const handleLanguageChange = (value) => {
    setLanguage(value);
  };

  const translateText = async (text) => {
    try {
      const response = await axios.post('https://translation-drab.vercel.app/api/translation', {
        text,
        targetLang: language,
      });
      return response.data.translatedText || text;
    } catch (error) {
      console.error('Translation error:', error);
      return text;
    }
  };

  const renderCard = ({ item }) => {
    const handlePress = () => {
      if (item.navigateTo) {
        navigation.navigate(item.navigateTo);
      } else {
        Alert.alert('No navigation destination specified!');
      }
    };

    return (
      <View style={[styles.card, { backgroundColor: item.backgroundColor }]}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <View style={styles.divider} />
        <Text style={styles.cardDescription}>
          {item.description.split('\n').map((line, index) => {
            const isHeading = /Mail\/Money order|Delivery of First Class Mail & Registered Letter|Delivery of Speed Post articles|Delivery of Express Parcel|Delivery of Business Parcel & Second Class Mail|Country:|Service Standard \(Days\)|Money Remittance|Instant Money Order|Delivery of Money Order|International Money Transfer Service|Transfer of Accounts|Settlement of customer requests|Discharge of Savings|Transfer of Savings Certificate|Issue of Duplicate Certificate|Deceased claim with nomination|Deceased claim without nomination|Issue of Duplicate Passbook|Interest Posting|Issue of acceptance Letter\/Policy Bond|Maturity claim settlement|Settlement of PLI\/RPLI death claims|Revival of policy|Issue of My stamp at Philately Bureau|Sale of Stamps and stationery|Miscellaneous Services|Issue of Acknowledgement of complaint|Settlement of Complaints/.test(line);
            return (
              <Text
                key={index}
                style={isHeading ? styles.cardHeading : styles.cardText}
              >
                {line}
                {'\n'}
              </Text>
            );
          })}
        </Text>
        <TouchableOpacity
          style={styles.moreButton}
          onPress={handlePress}
        >
          <Text style={styles.moreButtonText}>Click to see more</Text>
        </TouchableOpacity>
      </View>
    );
  };

  useEffect(() => {
    const translateServiceData = async () => {
      const translatedData = await Promise.all(
        serviceData.map(async (item) => {
          const translatedTitle = await translateText(item.title);
          const translatedDescription = await translateText(item.description);
          return {
            ...item,
            title: translatedTitle,
            description: translatedDescription,
          };
        })
      );
      setTranslations(translatedData);
    };

    translateServiceData();
  }, [language]);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Know Your Services</Text>
        <RNPickerSelect
          onValueChange={handleLanguageChange}
          items={[
            { label: 'English', value: 'en' },
            { label: 'Hindi', value: 'hi' },
            { label: 'Tamil', value: 'ta' },
            { label: 'Gujarati', value: 'gu' },
            { label: 'telugu', value: 'te' },
            // Add more languages here
          ]}
          style={pickerSelectStyles}
          value={language}
          placeholder={{ label: 'Select Language', value: null }}
        />
      </View>

      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search Services"
          value={searchText}
          onChangeText={handleSearch}
        />
        <Ionicons name="search" size={24} color="#333" style={styles.searchIcon} />
      </View>

      <FlatList
        data={translations.length > 0 ? translations : filteredData}
        renderItem={renderCard}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.cardContainer}
        snapToAlignment="center"
        decelerationRate="fast"
      />
    </View>
  );
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: 50,
    width: 150,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  inputAndroid: {
    height: 50,
    width: 150,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  header: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#333',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    position: 'relative',
  },
  searchBar: {
    flex: 1,
    height: 50,
    borderColor: '#333',
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingRight: 40,
    backgroundColor: '#fff',
  },
  searchIcon: {
    position: 'absolute',
    right: 12,
    top: '50%',
    transform: [{ translateY: -12 }],
  },
  cardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: screenWidth * 0.9,
    height: screenHeight * 0.75,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: screenWidth * 0.05,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  cardDescription: {
    fontSize: 16,
    color: '#666',
    flex: 1,
  },
  cardHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#444',
    marginVertical: 4,
  },
  cardText: {
    fontSize: 20,
    color: '#666',
    marginVertical: 2,
  },
  moreButton: {
    backgroundColor: '#333',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  moreButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});