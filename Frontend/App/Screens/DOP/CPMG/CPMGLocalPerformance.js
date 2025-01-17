import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ProgressChart, BarChart, PieChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get("window").width;

const OptionSelector = () => {
    const [activeOption, setActiveOption] = useState('Circle');
    const [activeData, setActiveData] = useState('Complaints');

    const progressChartData = {
        complaintsResolved: 0.75, // 75% complaints resolved
        deliveriesCompleted: 0.85, // 85% deliveries completed
        averageResolutionTime: 0.65 // 65% of complaints resolved within target time
    };

    const barChartData = {
        labels: ["January", "February", "March", "April", "May"],
        datasets: [
            {
                data: [500, 1200, 1800, 1500, 2200], // Complaints received in the last 5 months
                color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`, // Complaints dataset color
                strokeWidth: 2
            },
            {
                data: [400, 1100, 1700, 1400, 2100], // Deliveries completed in the last 5 months
                color: (opacity = 1) => `rgba(54, 162, 235, ${opacity})`, // Deliveries dataset color
                strokeWidth: 2
            }
        ]
    };

    const pieChartData = [
        {
            name: "Resolved Complaints",
            population: 75,
            color: "#36A2EB",
            legendFontColor: "#333",
            legendFontSize: 15
        },
        {
            name: "Unresolved Complaints",
            population: 25,
            color: "#FF6384",
            legendFontColor: "#333",
            legendFontSize: 15
        }
    ];

    const circleData = {
        complaints: {
            total: 677957,
            resolved: 53001,
            unresolved: 624956,
            avgResolutionTime: "8.5 days"
        },
        deliveries: {
            total: 20000,
            completed: 17000,
            pending: 3000,
            avgDeliveryTime: "4.3 days"
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.label}>Key Performance Indicators (KPIs)</Text>

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

            <View style={styles.dataOptionsContainer}>
                <TouchableOpacity
                    style={[styles.dataOption, activeData === 'Complaints' && styles.activeDataOption]}
                    onPress={() => setActiveData('Complaints')}
                >
                    <Text style={[styles.dataOptionText, activeData === 'Complaints' && styles.activeDataOptionText]}>
                        Complaints
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.dataOption, activeData === 'Deliveries' && styles.activeDataOption]}
                    onPress={() => setActiveData('Deliveries')}
                >
                    <Text style={[styles.dataOptionText, activeData === 'Deliveries' && styles.activeDataOptionText]}>
                        Deliveries
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Complaints Section */}
            {activeOption === 'Circle' && activeData === 'Complaints' && (
                <View style={styles.card}>
                    <ProgressChart
                        data={{ data: [progressChartData.complaintsResolved] }}
                        width={screenWidth - 40}
                        height={220}
                        strokeWidth={16}
                        radius={32}
                        chartConfig={{
                            backgroundColor: '#fff',
                            backgroundGradientFrom: '#f0f4f8',
                            backgroundGradientTo: '#f0f4f8',
                            color: (opacity = 1) => `rgba(54, 162, 235, ${opacity})`,
                            labelColor: () => '#000',
                        }}
                        style={styles.chartStyle}
                    />
                    <Text style={styles.kpiText}>Complaints Resolved: {(progressChartData.complaintsResolved * 100).toFixed(0)}%</Text>
                    <Text style={styles.text}>Total Complaints: {circleData.complaints.total}</Text>
                    <Text style={styles.text}>Resolved : {circleData.complaints.resolved}</Text>
                    <Text style={styles.text}>Unresolved: {circleData.complaints.unresolved}</Text>
                    <Text style={styles.text}>Avg Resolution Time: {circleData.complaints.avgResolutionTime}</Text>
                </View>
            )}

            {/* Deliveries Section */}
            {activeOption === 'Circle' && activeData === 'Deliveries' && (
                <View style={styles.card}>
                    <ProgressChart
                        data={{ data: [progressChartData.deliveriesCompleted] }}
                        width={screenWidth - 40}
                        height={220}
                        strokeWidth={16}
                        radius={32}
                        chartConfig={{
                            backgroundColor: '#fff',
                            backgroundGradientFrom: '#f0f4f8',
                            backgroundGradientTo: '#f0f4f8',
                            color: (opacity = 1) => `rgba(54, 162, 235, ${opacity})`,
                            labelColor: () => '#000',
                        }}
                        style={styles.chartStyle}
                    />
                    <Text style={styles.kpiText}>Deliveries Completed: {(progressChartData.deliveriesCompleted * 100).toFixed(0)}%</Text>
                    <Text style={styles.text}>Total Deliveries: {circleData.deliveries.total}</Text>
                    <Text style={styles.text}>Completed Deliveries: {circleData.deliveries.completed}</Text>
                    <Text style={styles.text}>Pending Deliveries: {circleData.deliveries.pending}</Text>
                    <Text style={styles.text}>Avg Delivery Time: {circleData.deliveries.avgDeliveryTime}</Text>
                </View>
            )}

            {/* Bar Chart */}
            <View style={styles.card}>
                <BarChart
                    data={barChartData}
                    width={screenWidth - 70}
                    height={220}
                    fromZero={true}
                    chartConfig={{
                        backgroundColor: '#fff',
                        backgroundGradientFrom: '#f0f4f8',
                        backgroundGradientTo: '#f0f4f8',
                        color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`,
                        labelColor: () => '#000',
                        propsForVerticalLabels: { fontSize: 12, color: '#555' }
                    }}
                    style={styles.chartStyle}
                />
                <Text style={styles.kpiText}>Complaints and Deliveries Over Time</Text>
            </View>

            {/* Pie Chart */}
            <View style={styles.card}>
                <PieChart
                    data={pieChartData}
                    width={screenWidth - 60}
                    height={220}
                    chartConfig={{
                        backgroundColor: '#fff',
                        backgroundGradientFrom: '#f0f4f8',
                        backgroundGradientTo: '#f0f4f8',
                        color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`,
                        labelColor: () => '#333',
                    }}
                    accessor="population"
                    backgroundColor="transparent"
                    style={styles.chartStyle}
                />
                <Text style={styles.kpiText}>Complaint Resolution Breakdown</Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#F0F4F8',
    },
    label: {
        fontSize: 22,
        fontWeight: '700',
        color: '#333',
        marginBottom: 15,
        textAlign: 'center',
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#CED4DA',
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 25,
    },
    picker: {
        height: 50,
        width: '100%',
        color: '#495057',
        backgroundColor: '#fff',
    },
    dataOptionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    dataOption: {
        padding: 12,
        borderRadius: 20,
        backgroundColor: '#E9ECEF',
        width: '40%',
        alignItems: 'center',
    },
    activeDataOption: {
        backgroundColor: '#007BFF',
    },
    dataOptionText: {
        fontSize: 16,
        color: '#007BFF',
        fontWeight: '600',
    },
    activeDataOptionText: {
        color: '#fff',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 5,
    },
    kpiText: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 10,
        color: '#333',
        textAlign: 'center',
    },
    text: {
        fontSize: 16,
        color: '#495057',
        marginBottom: 5,
    },
    chartStyle: {
        marginVertical: 10,
    },
});

export default OptionSelector;
