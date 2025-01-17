import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const tableData = [
  {
    category: 'Opening of account, closing of account, withdrawal, and deposit',
    description: 'Please see Counter Services.',
    rows: [],
  },
  {
    category: '1 Transfer of Accounts (Please collect dated receipt)',
    rows: [
      { service: 'Within the same Head Post Office', time: '1', unit: 'Working Day' },
      { service: 'From one Head Post Office to another Head Post Office', time: '7', unit: 'Working Days' },
      { service: 'Requested at the transferee post office', time: '15', unit: 'Working Days' },
    ],
  },
  {
    category: '2 Settlement of customer requests for: -',
    rows: [
      { service: 'i) Deceased claims (after receipt of complete documents)', time: '', unit: '' },
      { service: 'a) Where nomination exists', time: '1', unit: 'Working Day' },
      { service: 'b) Where no nomination exists', time: '7', unit: 'Working Days' },
      { service: 'ii) Issue of Duplicate Passbook', time: '7', unit: 'Working Days' },
      { service: 'iii) Interest Posting', time: '1', unit: 'Working Day' },
    ],
  },
  {
    category: '3 Discharge of Savings Certificates at post office other than the office of purchase',
    rows: [
      { service: 'Time taken from the receipt of application for discharge of certificates at the post office.', time: '30', unit: 'Working Days' },
    ],
  },
  {
    category: '4 Transfer of Savings Certificate',
    rows: [
      { service: 'Time taken from the receipt of application for transfer at the post office.', time: '30', unit: 'Working Days' },
    ],
  },
  {
    category: '5 Issue of Duplicate Certificate',
    rows: [
      { service: 'i) Certificate issued before 01.07.2016', time: '', unit: '' },
      { service: 'Time taken from the receipt of application along with required documents at the post office of issue of the certificate.', time: '15', unit: 'Working Days' },
      { service: 'ii) Certificate issued on or after 01.07.2016', time: '', unit: '' },
      { service: 'Presented at HO', time: '1', unit: 'Day' },
      { service: 'Presented at SO', time: '7', unit: 'Days' },
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
      {/* Add Heading before the First Section */}
      {index === 0 && (
        <Text style={styles.sectionHeading}>
          A. Post Office Savings Bank
        </Text>
      )}

      <Text style={styles.sectionHeader}>{item.category}</Text>
      {item.description && (
        <Text style={styles.sectionDescription}>{item.description}</Text>
      )}

      <View style={styles.divider} />

      {item.rows.length > 0 && (
        <>
          <View style={styles.headerRow}>
            <Text style={styles.headerCell}>Qualifying Description</Text>
            <Text style={styles.headerCell}>Service Standards</Text>
            <Text style={styles.headerCell}>Unit</Text>
          </View>

          <FlatList
            data={item.rows}
            renderItem={renderRow}
            keyExtractor={(row, index) => `${item.category}-${row.service}-${index}`}
            scrollEnabled={false}
          />
        </>
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
