import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const tableData = [
  {
    category: 'International Service Standards',
    rows: [
      { service: 'Afghanistan', time: '3-7', unit: 'Days' },
      { service: 'Argentina', time: '5-9', unit: 'Days' },
      { service: 'Australia', time: '4-8', unit: 'Days' },
      { service: 'Austria', time: '4-8', unit: 'Days' },
      { service: 'Bahrain', time: '4-8', unit: 'Days' },
      { service: 'Bangladesh', time: '3-7', unit: 'Days' },
      { service: 'Barbados', time: '5-9', unit: 'Days' },
      { service: 'Belarus', time: '5-9', unit: 'Days' },
      { service: 'Belgium', time: '4-8', unit: 'Days' },
      { service: 'Bermuda', time: '5-9', unit: 'Days' },
      { service: 'Bhutan', time: '3-7', unit: 'Days' },
      { service: 'Bosnia and Herzegovina', time: '5-9', unit: 'Days' },
      { service: 'Botswana', time: '6-9', unit: 'Days' },
      { service: 'Brazil', time: '5-9', unit: 'Days' },
      { service: 'Brunei Darussalam', time: '3-7', unit: 'Days' },
      { service: 'Bulgaria', time: '5-9', unit: 'Days' },
      { service: 'Cambodia', time: '3-6', unit: 'Days' },
      { service: 'Canada', time: '5-9', unit: 'Days' },
      { service: 'Cape Verde', time: '6-9', unit: 'Days' },
      { service: 'China', time: '4-9', unit: 'Days' },
      { service: 'Cuba', time: '5-9', unit: 'Days' },
      { service: 'Cyprus', time: '5-9', unit: 'Days' },
      { service: 'Denmark', time: '4-8', unit: 'Days' },
      { service: 'Ethiopia', time: '6-9', unit: 'Days' },
      { service: 'Fiji', time: '4-9', unit: 'Days' },
      { service: 'France', time: '2-6', unit: 'Days' },
      { service: 'Germany', time: '6-9', unit: 'Days' },
      { service: 'Greece', time: '5-9', unit: 'Days' },
      { service: 'Hong Kong', time: '3-7', unit: 'Days' },
      { service: 'India', time: '2-5', unit: 'Days' }, // Example: Add more rows as needed
      { service: 'United Kingdom', time: '2-6', unit: 'Days' },
      { service: 'USA', time: '4-7', unit: 'Days' },
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
          A. International Service Standards
        </Text>
      )}
      <Text style={styles.sectionHeader}>{item.category}</Text>
      <View style={styles.divider} />

      {item.rows.length > 0 && (
        <>
          <View style={styles.headerRow}>
            <Text style={styles.headerCell}>Destination</Text>
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
