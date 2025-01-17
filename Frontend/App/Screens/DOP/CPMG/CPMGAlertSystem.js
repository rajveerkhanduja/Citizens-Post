import React, { useState } from 'react';
import { View, Text, Button, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const ComplaintAlertsComponent = () => {
  const [selectedCategory, setSelectedCategory] = useState('alert');
  const [selectedComplaintCategory, setSelectedComplaintCategory] = useState('deliveryIssues'); // Default category

  const data = {
    complaintsAnalysis: {
      deliveryIssues: [
        {
          complaintId: 1,
          location: 'Surat, Gujarat, India',
          resolution:
            'Investigate the status of the parcel with the Surat delivery office. Contact the customer and provide an update on the delivery. If the parcel is lost, initiate a claim process.',
        },
        {
          complaintId: 2,
          location: 'Delhi, Delhi, India',
          resolution:
            'Track the parcel within the Delhi sorting facility. Contact the customer with an estimated delivery time. Investigate the reason for the delay and take corrective actions.',
        },
        {
          complaintId: 3,
          location: 'Chennai, Tamil Nadu, India',
          resolution:
            'Check the delivery process in Chennai and ensure proper route optimization. Update the customer on the expected delivery timeline.',
        },
      ],
      addressIssues: [
        {
          complaintId: 4,
          location: 'Delhi, Delhi, India',
          resolution:
            'Retrieve the misdirected parcel from Noida. Correctly deliver it to the customer\'s address in East Delhi. Review address verification processes.',
        },
        {
          complaintId: 5,
          location: 'Mumbai, Maharashtra, India',
          resolution:
            'Verify the address and send the parcel to the correct location. Contact the customer to inform them of the update.',
        },
      ],
      missingParcels: [
        {
          complaintId: 6,
          location: 'Bangalore, Karnataka, India',
          resolution:
            'Initiate a thorough investigation to locate the missing parcel. Contact the customer and keep them updated. If the parcel cannot be located, process a claim.',
        },
        {
          complaintId: 7,
          location: 'Hyderabad, Telangana, India',
          resolution:
            'Locate the missing parcel by cross-referencing tracking information. Notify the customer and initiate compensation if necessary.',
        },
      ],
    },
    alerts: [
      {
        priority: 'High',
        description:
          'High number of missing parcels reported in Delhi. This indicates a potential systemic issue within the Delhi sorting facility.',
        suggestedAction:
          'Conduct an immediate audit of the Delhi sorting facility\'s processes and procedures. Implement enhanced tracking mechanisms and improve security measures to prevent further losses.',
        affectedRegions: ['Delhi, Delhi, India'],
      },
      {
        priority: 'Medium',
        description:
          'Significant delays and delivery issues reported across multiple regions. This suggests potential operational inefficiencies.',
        suggestedAction:
          'Review and optimize delivery routes and processes. Improve communication with customers regarding delays and provide estimated delivery times.',
        affectedRegions: ['Surat, Gujarat, India', 'Delhi, Delhi, India'],
      },
      {
        priority: 'Low',
        description:
          'Minor issues reported regarding incorrect delivery addresses across select regions. Should be reviewed to avoid recurrent problems.',
        suggestedAction:
          'Investigate address verification process improvements. Educate customers on correct address entry during checkout.',
        affectedRegions: ['Mumbai, Maharashtra, India', 'Bangalore, Karnataka, India'],
      },
    ],
  };

  const renderAlerts = () => {
    return data.alerts.map((alert, index) => (
      <View key={index} style={styles.alertContainer}>
        <Text style={styles.alertPriority}>Priority: {alert.priority}</Text>
        <Text style={styles.alertDescription}>Description: {alert.description}</Text>
        <Text style={styles.alertAction}>Suggested Action: {alert.suggestedAction}</Text>
        <Text style={styles.alertRegions}>Affected Regions: {alert.affectedRegions.join(', ')}</Text>
      </View>
    ));
  };

  const renderComplaints = () => {
    const complaintsData = data.complaintsAnalysis;
    const complaintCategories = Object.keys(complaintsData);

    const complaintsToRender = complaintsData[selectedComplaintCategory];

    return (
      <View style={styles.complaintsContainer}>
        <Picker
          selectedValue={selectedComplaintCategory}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedComplaintCategory(itemValue)}
        >
          {complaintCategories.map((category, index) => (
            <Picker.Item key={index} label={category} value={category} />
          ))}
        </Picker>

        {complaintsToRender.map((complaint) => (
          <View key={complaint.complaintId} style={styles.complaintCard}>
            <Text style={styles.complaintId}>Complaint ID: {complaint.complaintId}</Text>
            <Text style={styles.complaintLocation}>Location: {complaint.location}</Text>
            <Text style={styles.complaintResolution}>Resolution: {complaint.resolution}</Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            selectedCategory === 'alert' && styles.selectedButton,
          ]}
          onPress={() => setSelectedCategory('alert')}
        >
          <Text style={styles.buttonText}>Alerts</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            selectedCategory === 'complaints' && styles.selectedButton,
          ]}
          onPress={() => setSelectedCategory('complaints')}
        >
          <Text style={styles.buttonText}>Complaints</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        {selectedCategory === 'alert' ? renderAlerts() : renderComplaints()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:50,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: '#007AFF',
    borderRadius: 25,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  selectedButton: {
    backgroundColor: '#0056D6',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  scrollView: {
    flex: 1,
  },
  alertContainer: {
    padding: 20,
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    borderLeftWidth: 5,
    borderLeftColor: '#ff3b30',
  },
  alertPriority: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
    color: '#ff3b30',
  },
  alertDescription: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  alertAction: {
    fontSize: 14,
    marginBottom: 5,
    color: '#666',
  },
  alertRegions: {
    fontSize: 14,
    marginTop: 5,
    color: '#666',
  },
  complaintsContainer: {
    paddingTop: 10,
  },
  picker: {
    height: 60,
    width: '100%',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  complaintCard: {
    padding: 20,
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    borderLeftWidth: 5,
    borderLeftColor: '#007AFF',
  },
  complaintId: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
    color: '#007AFF',
  },
  complaintLocation: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  complaintResolution: {
    fontSize: 14,
    color: '#666',
  },
});

export default ComplaintAlertsComponent;
