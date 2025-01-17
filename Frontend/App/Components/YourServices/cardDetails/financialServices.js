import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const financialServicesData = [
  {
    category: '2.1 Delivery of Money Order Local* and between Metro Cities**',
    description: '* Local – within Municipal City limits\n** Metro - Delhi, Mumbai, Kolkata, Chennai, Hyderabad, and Bengaluru.',
    rows: [
      { service: 'Local* and between Metro Cities**', time: '2', unit: 'Working Days' },
      { service: 'Rest of India', time: '4', unit: 'Working Days' },
    ],
  },
  {
    category: '2.2 International Money Transfer Service',
    description: 'Payment of instant inward remittances received through Money Transfer operators like Western Union (Service available at specified offices).',
    rows: [
      { service: 'Payment on production of code and required documents', time: '10', unit: 'Minutes' },
    ],
  },
];

const FinancialServicesTable = () => {
  const renderRow = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.service || 'N/A'}</Text>
      <Text style={styles.cell}>{item.time || 'N/A'}</Text>
      <Text style={styles.cell}>{item.unit || 'N/A'}</Text>
    </View>
  );

  const renderSection = ({ item, index }) => (
    <View style={styles.section}>
      {/* Add Heading for Financial Services */}
      {index === 0 && (
        <Text style={styles.sectionHeading}>A. Financial Services</Text>
      )}

      <Text style={styles.sectionHeader}>{item.category}</Text>
      {item.description && (
        <Text style={styles.sectionDescription}>{item.description}</Text>
      )}

      <View style={styles.divider} />

      <View style={styles.headerRow}>
        <Text style={styles.headerCell}>Qualifying Description</Text>
        <Text style={styles.headerCell}>Service Standards</Text>
        <Text style={styles.headerCell}>Unit in Days/Minutes</Text>
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
      data={financialServicesData}
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

export default FinancialServicesTable;
