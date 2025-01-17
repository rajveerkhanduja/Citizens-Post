import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const tableData = [
  {
    category: '1 Issue of Acknowledgement of complaint',
    rows: [
      { service: 'On the day of receipt itself', time: 'On the day of receipt itself', unit: 'Day' },
    ],
  },
  {
    category: '2 Settlement of Complaints',
    rows: [
      { service: 'Time from lodging of complaint', time: '60', unit: 'Days' },
    ],
  },
  {
    category: '3 Settlement of complaint in cases requiring investigation',
    rows: [
      { service: 'Time from lodging of complaint', time: '90', unit: 'Days' },
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
          A. Service Standards of Public Grievance Redress
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
