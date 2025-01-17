import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const tableData = [
  {
    category: '6. Service Standards of various services for Branch Office',
    description: '',
    rows: [
      { service: '6.1 Sale of Stamps and stationery', time: '3', unit: 'Minutes' },
      { service: '6.2 Miscellaneous Services', time: '10', unit: 'Minutes' },
    ],
  },
  {
    category: '7. Transactions for which the Branch Office is authorized',
    description: '',
    rows: [
      { service: 'Booking of Registered Articles', time: '10', unit: 'Minutes' },
      { service: 'Booking of Money Orders', time: '10', unit: 'Minutes' },
      { service: 'Collection and Payment of PLI premia', time: '10', unit: 'Minutes' },
      { service: 'Post Office Savings Bank Deposit & withdrawal', time: '10', unit: 'Minutes' },
    ],
  },
  {
    category: '8. Transaction which are required to be authorized / routed through the Account Office',
    description: 'Transaction of all nine schemes which are required to be authorized/routed through the Account Office. Time taken is in addition to the relevant service standards declared for authorized Branch Offices.',
    rows: [
      { service: 'Transaction of all nine schemes', time: '6', unit: 'Days' },
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
      {/* Add Heading for Sections */}
      {index === 0 && (
        <Text style={styles.sectionHeading}>A. Service Standards for Branch Offices</Text>
      )}
      {index === 1 && (
        <Text style={styles.sectionHeading}>B. Authorized Transactions for Branch Offices</Text>
      )}
      {index === 2 && (
        <Text style={styles.sectionHeading}>C. Transactions Routed through Account Office</Text>
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
