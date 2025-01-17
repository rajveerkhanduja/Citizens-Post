import React from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';

const tableData = [
  {
    category: '1. Mails/Money Order',
    description: 'Time from posting / booking to delivery',
    notes: [
      'Excludes: day of posting for articles booked after cut-off time, holidays & Sundays.',
      'Adverse effect due to reasons beyond the control of DOP like curfew, bandh, strike, cancellation of means of transport or off-loading/non-carriage of mails by carriers and force majeure.',
      'Article/MO booked/delivered in BOs will take 1 extra day.',
      'Standards apply to articles conforming to Gazette notification no: 486, dated 23.09.2013 (excluding MO), and bearing correct address & Pin code.',
    ],
    rows: [
      { service: '', time: '2', unit: 'Days' },
    ],
  },
  {
    category: '1.1 Delivery of First Class Mail (Letters, Postcards & Registered Letter cards)',
    rows: [
      { service: 'Local*', time: '2 - 4', unit: 'Days' },
      { service: 'Metro<>Metro**', time: '2 - 4', unit: 'Days' },
      { service: 'Same state', time: '2 - 6', unit: 'Days' },
      { service: 'State Capital to State Capital', time: '3 - 5', unit: 'Days' },
      { service: 'Rest of the country', time: '5 - 6', unit: 'Days' },
    ],
  },
  {
    category: '1.2 Delivery of Speed Post articles',
    rows: [
      { service: 'Local*', time: '1 - 2', unit: 'Days' },
      { service: 'Metro - Metro', time: '1 - 3', unit: 'Days' },
      { service: 'State Capital to State Capital', time: '1 - 3', unit: 'Days' },
      { service: 'Same State', time: '1 - 4', unit: 'Days' },
      { service: 'Rest of the country', time: '4 - 5', unit: 'Days' },
    ],
  },
  {
    category: '1.3 Delivery of Business Parcel & Second Class Mail (Parcel, Book packet, Registered Newspapers, Blind Literature packets)',
    rows: [
      { service: 'Local*', time: '3', unit: 'Days' },
      { service: 'Metro<>Metro**', time: '4 - 5', unit: 'Days' },
      { service: 'State Capital to State Capital', time: '4 - 6', unit: 'Days' },
      { service: 'Same State', time: '3 - 6', unit: 'Days' },
      { service: 'Rest of the country', time: '6 - 7', unit: 'Days' },
    ],
  },
  {
    category: '1.4 International EMS articles',
    description: 'All International Mail articles are subject to customs examination. Period for customs examination/detention is not included in the service standards. These are "End to End" delivery standards for Outbound articles booked in cities with OEs, i.e. Delhi, Mumbai, Kolkata, Chennai and Kochi. For articles booked at other locations, the timelines as per domestic speed post service standards will be added.',
    rows: [
      { service: 'Australia', time: '4 - 8', unit: 'Days' },
      { service: 'Canada', time: '5 - 9', unit: 'Days' },
      { service: 'China', time: '4 - 9', unit: 'Days' },
      { service: 'France', time: '4 - 8', unit: 'Days' },
      { service: 'Japan', time: '3 - 6', unit: 'Days' },
      { service: 'Malaysia', time: '3 - 7', unit: 'Days' },
      { service: 'Russia', time: '5 - 9', unit: 'Days' },
      { service: 'Saudi Arabia', time: '4 - 8', unit: 'Days' },
      { service: 'Singapore', time: '3 - 6', unit: 'Days' },
      { service: 'South Korea', time: '3 - 7', unit: 'Days' },
      { service: 'Taiwan', time: '3 - 6', unit: 'Days' },
      { service: 'UAE', time: '4 - 8', unit: 'Days' },
      { service: 'United Kingdom (UK)', time: '2 - 6', unit: 'Days' },
      { service: 'United States of America', time: '4 - 7', unit: 'Days' },
    ],
  },
  {
    category: '2.1 Delivery of Money Order Local* and between Metro Cities**',
    description: 'Money Order delivery for local and metro cities, including Delhi, Mumbai, Kolkata, Chennai, Hyderabad, and Bengaluru.',
    rows: [
      { service: 'Local* and between Metro Cities**', time: '2', unit: 'Working Days' },
      { service: 'Rest of India', time: '4', unit: 'Working Days' },
    ],
  },
  {
    category: '2.2 International Money Transfer Service',
    description: 'Payment of instant inward remittances received through Money Transfer operators like Western Union.',
    rows: [
      { service: 'Payment on production of code and required documents', time: '10', unit: 'Minutes' },
    ],
  },
];

const PostalServicesTable = () => {
  const renderRow = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.service || 'N/A'}</Text>
      <Text style={styles.cell}>{item.time || 'N/A'}</Text>
      <Text style={styles.cell}>{item.unit || 'N/A'}</Text>
    </View>
  );

  const renderSection = ({ item, index }) => (
    <View style={styles.section}>
      {/* Add Heading before First and Second Sections */}
      {index === 0 && (
        <Text style={styles.sectionHeading}>A. Service Standards of various services for Departmental Post Offices</Text>
      )}
      {index === 6 && (
        <Text style={styles.sectionHeading}>B.Financial Services </Text>
      )}

      <Text style={styles.sectionHeader}>{item.category}</Text>
      {item.description && (
        <Text style={styles.sectionDescription}>{item.description}</Text>
      )}

      <View style={styles.divider} />

      <View style={styles.headerRow}>
        <Text style={styles.headerCell}>Qualifying Description</Text>
        <Text style={styles.headerCell}>Service Standards</Text>
        <Text style={styles.headerCell}>Unit in Days/Minutes etc.</Text>
      </View>

      {item.rows && item.rows.length > 0 && (
        <FlatList
          data={item.rows}
          renderItem={renderRow}
          keyExtractor={(row, index) =>
            `${item.category}-${row.service}-${index}`
          }
          scrollEnabled={false}
        />
      )}
    </View>
  );

  return (
    <FlatList
      data={tableData}
      renderItem={renderSection}
      keyExtractor={(item, index) => `section-${index}`}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#fff',
  },
  section: {
    marginBottom: 20,
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#CD0201', // Heading color
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 5,
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    paddingHorizontal: 5,
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#CD0201',
    paddingVertical: 5,
    marginBottom: 5,
  },
  headerCell: {
    flex: 1,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 5,
    borderRightWidth: 1,
    borderRightColor: '#ddd',
    color: '#fff',
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
  },
});

export default PostalServicesTable;