import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

const FeedbackForm = () => {
  const [form, setForm] = useState({
    serviceType: '',
    qualityRating: 0,
    timelinessRating: 0,
    behaviorRating: 0,
    additionalComments: '',
  });

  const handleRatingChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = () => {
    console.log('Feedback Submitted:', form);
    alert('Thank you for your feedback!');
  };

  const renderStars = (ratingKey) => {
    return (
      <View style={styles.starContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity
            key={star}
            onPress={() => handleRatingChange(ratingKey, star)}
            style={[
              styles.starButton,
              form[ratingKey] >= star && styles.selectedStar,
            ]}
          >
            <Text style={styles.starText}>★</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>
        <Text style={styles.asterisk}>*</Text> Feedback Form
      </Text>

      <Text style={styles.label}>
        <Text style={styles.asterisk}>*</Text>Service Type
      </Text>
      <Picker
        selectedValue={form.serviceType}
        onValueChange={(value) => handleChange('serviceType', value)}
        style={styles.picker}
      >
        <Picker.Item label="Select Service Type" value="" />
        <Picker.Item label="Financial Service" value="FinancialService" />
        <Picker.Item label="Insurance" value="Insurance" />
        <Picker.Item label="Mail and Money Orders" value="MailandMoneyOrders" />
      </Picker>

      {/* Quality of Service Rating */}
      <Text style={styles.label}>
        <Text style={styles.asterisk}>*</Text>Quality of Service
      </Text>
      {renderStars('qualityRating')}

      {/* Timeliness Rating */}
      <Text style={styles.label}>
        <Text style={styles.asterisk}>*</Text>Timeliness
      </Text>
      {renderStars('timelinessRating')}

      {/* Staff Behavior Rating */}
      <Text style={styles.label}>
        <Text style={styles.asterisk}>*</Text>Staff Behavior
      </Text>
      {renderStars('behaviorRating')}

      <Text style={styles.label}>Additional Comments</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Enter any additional comments (optional)"
        value={form.additionalComments}
        onChangeText={(value) => handleChange('additionalComments', value)}
        multiline
        maxLength={500}
      />

      <TouchableOpacity style={styles.fullScreenButton} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
      <View style={styles.bottomSpace} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  heading: {
    fontSize: 19,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 8,
  },
  asterisk: {
    color: 'red',
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 4,
    backgroundColor: '#fff',
    marginTop: 4,
  },
  fullScreenButton: {
    backgroundColor: '#CD0201',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    height: 50,
    width: '100%',
    marginBottom: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  starContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 16,
  },
  starButton: {
    marginHorizontal: 4,
    padding: 10,
  },
  selectedStar: {
    backgroundColor: '#FFD700',
    borderRadius: 50,
  },
  starText: {
    fontSize: 30,
    color: '#999',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#fff',
  },
  bottomSpace: {
    height: 10,
  },
});

export default FeedbackForm;
