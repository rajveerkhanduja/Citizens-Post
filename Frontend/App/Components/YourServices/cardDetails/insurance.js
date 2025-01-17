import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const tableData = [
  {
    category: '4. Postal Life Insurance and Rural Postal Life Insurance',
    description: '',
    rows: [
      { service: '4.1 Issue of Acceptance Letter', time: '15', unit: 'Days' },
      { service: '4.2 Maturity claim settlement/Paid up value', time: '15', unit: 'Days' },
      { service: '4.3 Settlement of PLI/RPLI death claims', time: '30', unit: 'Days' },
      { service: '4.3 Involving investigation', time: '90', unit: 'Days' },
      { service: '4.4 Revival of policy', time: '15', unit: 'Days' },
      { service: '4.5 (i) Loan against policies', time: '10', unit: 'Days' },
      { service: '4.5 (ii) Change of address', time: '5', unit: 'Days' },
      { service: '4.5 (iii) Change of nomination', time: '10', unit: 'Days' },
      { service: '4.5 (iv) Assignment of policy', time: '10', unit: 'Days' },
      { service: '4.5 (v) Issue of duplicate policy bond', time: '10', unit: 'Days' },
    ],
  },
  {
    category: '5. Counter Services (excluding waiting time in queue)',
    rows: [
      { service: '', time: '2-5', unit: 'Minutes' },
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
        <Text style={styles.sectionHeading}>A. Postal Life Insurance and Rural Postal Life Insurance</Text>
      )}
      {index === 1 && (
        <Text style={styles.sectionHeading}>B. Counter Services</Text>
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
