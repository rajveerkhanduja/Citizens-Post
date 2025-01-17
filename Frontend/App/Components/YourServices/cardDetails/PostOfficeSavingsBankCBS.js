import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const tableData = [
  {
    category: '1.1 Transfer of Accounts',
    rows: [
      { service: 'Request at any Head Post Office', time: '1', unit: 'Working Day' },
      { service: 'Request at any Sub Post Office', time: '3', unit: 'Working Days' },
    ],
  },
  {
    category: '1.2 Deceased claim with nomination',
    rows: [
      { service: 'If presented at Head Post Office (HO) or Sub Post Office (SO)', time: '1', unit: 'Working Day' },
    ],
  },
  {
    category: '1.3 Deceased claim without nomination',
    rows: [
      { service: 'If presented at HO or SO and within powers of HO or SO', time: '1', unit: 'Working Day' },
      { service: 'If beyond powers of HO or SO and within powers of Divisional Heads', time: '7', unit: 'Working Days' },
    ],
  },
  {
    category: '1.4 Issue of Duplicate Passbook',
    rows: [
      { service: 'When presented at HO', time: '1', unit: 'Working Day' },
      { service: 'When presented at any SO', time: '7', unit: 'Working Days' },
    ],
  },
  {
    category: '1.5 Interest Posting',
    rows: [
      { service: 'Interest Posting', time: '1', unit: 'Working Day (Same Day)' },
    ],
  },
  {
    category: '1.6 Discharge of Savings Certificates at post office other than the office of purchase after transfer of certificate',
    rows: [
      { service: 'Payment request at HO', time: '1', unit: 'Working Day' },
      { service: 'Payment request at SO (cash/transfer to savings account)', time: '1', unit: 'Working Day' },
      { service: 'Payment request at SO (cheque)', time: '3', unit: 'Working Days' },
    ],
  },
  {
    category: '1.7 Transfer of Certificates (Please collect dated receipt)',
    rows: [
      { service: 'Request at HO', time: '1', unit: 'Working Day' },
      { service: 'Request at SO', time: '3', unit: 'Working Days' },
      { service: 'Requested at any Sub Post Office in physical form issued before 01.07.2016', time: '3', unit: 'Working Days' },
    ],
  },
  {
    category: '1.8 Issue of Duplicate Certificate',
    rows: [
      { service: 'i) Certificate issued before 01.07.2016', time: '15', unit: 'Working Days' },
      { service: 'ii) Certificate issued on or after 01.07.2016 - Presented at HO', time: '1', unit: 'Day' },
      { service: 'ii) Certificate issued on or after 01.07.2016 - Presented at SO', time: '7', unit: 'Days' },
    ],
  },
  {
    category: '1.9 Opening of Account/Purchase of saving certificates (after clearance of cheque)',
    rows: [
      { service: 'Opening of Account/Purchase of saving certificates', time: '1', unit: 'Working Day' },
    ],
  },
  {
    category: '1.10 Closure of Account',
    rows: [
      { service: 'If account closed at HO', time: '1', unit: 'Working Day' },
      { service: 'If account closed at SO (for payment by cash/transfer to savings account)', time: '1', unit: 'Working Day' },
      { service: 'If account closed at SO (for payment by cheque)', time: '3', unit: 'Working Days' },
    ],
  },
  {
    category: '1.11 Issue of ATM card (Instant)',
    rows: [
      { service: 'After receipt of complete application/documents', time: '1', unit: 'Working Day' },
    ],
  },
  {
    category: '1.12 Issue of ATM Card (Personalized)',
    rows: [
      { service: 'After receipt of complete application/documents', time: '30', unit: 'Days' },
    ],
  },
  {
    category: '1.13 Enabling e-banking/m-banking',
    rows: [
      { service: 'After receipt of complete application/documents', time: '1', unit: 'Working Day' },
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
    color: '#CD0201',
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
