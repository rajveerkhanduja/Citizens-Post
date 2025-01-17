import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

// Circle components
import CircleComplainDetails from "../../../DopComponents/DOP-KPI/CircleComplainDetails.js";
import CircleDevliveryDetails from "../../../DopComponents/DOP-KPI/CircleDeliveryDetails.js";

// Regional components 
import RegionalComplainDetails from "../../../DopComponents/DOP-KPI/RegionalComplainDetails copy.js"; // Updated path for regional complaint details
import RegionalDevliveryDetails from "../../../DopComponents/DOP-KPI/RegionalDeliveryDetails copy.js"; // Updated path for regional delivery details

// Division components (If applicable)
import DivisionComplainDetails from "../../../DopComponents/DOP-KPI/DivisionComplaintDetails.js"; 
import DivisionDevliveryDetails from "../../../DopComponents/DOP-KPI/DivisionDeliveresDetails.js"; 

const OptionSelector = () => {
    const [activeOption, setActiveOption] = useState('Circle');
    const [activeData, setActiveData] = useState('Complaints');

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.label}>Select an Option:</Text>

            {/* Dropdown Menu for picking an option */}
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={activeOption}
                    onValueChange={(itemValue) => setActiveOption(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="Circle" value="Circle" />
                    <Picker.Item label="Region" value="Region" />
                    <Picker.Item label="Division" value="Division" />
                </Picker>
            </View>

            {/* Option Selector for Complaints and Deliveries */}
            <View style={styles.dataOptionsContainer}>
                <TouchableOpacity
                    style={[
                        styles.dataOption,
                        activeData === 'Complaints' && styles.activeDataOption,
                    ]}
                    onPress={() => setActiveData('Complaints')}
                >
                    <Text
                        style={[
                            styles.dataOptionText,
                            activeData === 'Complaints' && styles.activeDataOptionText,
                        ]}
                    >
                        Complaints
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.dataOption,
                        activeData === 'Deliveries' && styles.activeDataOption,
                    ]}
                    onPress={() => setActiveData('Deliveries')}
                >
                    <Text
                        style={[
                            styles.dataOptionText,
                            activeData === 'Deliveries' && styles.activeDataOptionText,
                        ]}
                    >
                        Deliveries
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Conditional Rendering for Circle, Region, and Division based on selected options */}
            {activeOption === 'Circle' && activeData === 'Complaints' && <CircleComplainDetails />}
            {activeOption === 'Circle' && activeData === 'Deliveries' && <CircleDevliveryDetails />}

            {activeOption === 'Region' && activeData === 'Complaints' && <RegionalComplainDetails />}
            {activeOption === 'Region' && activeData === 'Deliveries' && <RegionalDevliveryDetails />}

            {activeOption === 'Division' && activeData === 'Complaints' && <DivisionComplainDetails />}
            {activeOption === 'Division' && activeData === 'Deliveries' && <DivisionDevliveryDetails />}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        padding: 20,
        backgroundColor: '#f9f9f9',
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 20,
        width: 170,
        marginBottom: 20,
    },
    picker: {
        width: 150,
        height: 55,
    },
    dataOptionsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    dataOption: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        margin: 10,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#ccc',
    },
    activeDataOption: {
        backgroundColor: 'red',
        borderColor: 'red',
    },
    dataOptionText: {
        fontSize: 16,
        color: 'black',
    },
    activeDataOptionText: {
        color: 'white',
    },
    activeDataText: {
        fontSize: 18,
    },
});

export default OptionSelector;
