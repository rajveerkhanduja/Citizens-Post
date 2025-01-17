import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ProgressChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

// Get screen width for responsive design
const screenWidth = Dimensions.get('window').width;

const App = () => {
  // Data with percentages for each feedback type
  const positiveData = 0.6; // 60%
  const neutralData = 0.3; // 30%
  const negativeData = 0.1; // 10%

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {/* Top row - First two components */}
        <View style={styles.box}>
          <View style={styles.chartContainer}>
            <ProgressChart
              data={{ data: [positiveData] }}
              width={screenWidth / 2 - 30}
              height={120}
              strokeWidth={12}
              radius={32}
              chartConfig={{
                backgroundColor: '#fff',
                backgroundGradientFrom: '#fff',
                backgroundGradientTo: '#fff',
                color: (opacity = 1) => `rgba(46, 204, 113, ${opacity})`, // Premium green
                labelColor: () => '#2c3e50', // Darker color for premium look
                propsForDots: {
                  r: '6',
                  strokeWidth: '2',
                  stroke: '#fff',
                },
              }}
            />
          </View>
          <Text style={styles.percentageText}>{(positiveData * 100).toFixed(0)}%</Text>
          <Text style={styles.label}>Positive</Text>
        </View>
        <View style={styles.box}>
          <View style={styles.chartContainer}>
            <ProgressChart
              data={{ data: [neutralData] }}
              width={screenWidth / 2 - 30}
              height={120}
              strokeWidth={12}
              radius={32}
              chartConfig={{
                backgroundColor: '#fff',
                backgroundGradientFrom: '#fff',
                backgroundGradientTo: '#fff',
                color: (opacity = 1) => `rgba(241, 196, 15, ${opacity})`, // Premium yellow
                labelColor: () => '#2c3e50',
                propsForDots: {
                  r: '6',
                  strokeWidth: '2',
                  stroke: '#fff',
                },
              }}
            />
          </View>
          <Text style={styles.percentageText}>{(neutralData * 100).toFixed(0)}%</Text>
          <Text style={styles.label}>Neutral</Text>
        </View>
      </View>

      <View style={styles.row}>
        {/* Bottom row - Last two components */}
        <View style={styles.box}>
          <View style={styles.chartContainer}>
            <ProgressChart
              data={{ data: [negativeData] }}
              width={screenWidth / 2 - 30}
              height={120}
              strokeWidth={12}
              radius={32}
              chartConfig={{
                backgroundColor: '#fff',
                backgroundGradientFrom: '#fff',
                backgroundGradientTo: '#fff',
                color: (opacity = 1) => `rgba(231, 76, 60, ${opacity})`, // Premium red
                labelColor: () => '#2c3e50',
                propsForDots: {
                  r: '6',
                  strokeWidth: '2',
                  stroke: '#fff',
                },
              }}
            />
          </View>
          <Text style={styles.percentageText}>{(negativeData * 100).toFixed(0)}%</Text>
          <Text style={styles.label}>Negative</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.label}>Total Feedback</Text>
          <Text style={styles.totalFeedbackText}>1000</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20, // Increased padding for breathing room
    backgroundColor: '#ecf0f1', // Light background for contrast
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  box: {
    width: '48%', // 2 boxes side by side
    backgroundColor: '#ffffff', // White for cleanliness
    padding: 20, // Increased padding for more luxury feel
    borderRadius: 16, // Softer rounded corners
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 8,
    elevation: 6, // Improved shadow and elevation for depth
  },
  chartContainer: {
    borderRadius: 50,
    overflow: 'hidden', // Ensures the chart takes the border-radius shape
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
    color: '#2c3e50', // Consistent darker color for premium text
  },
  totalFeedbackText: {
    fontSize: 26,
    fontWeight: '700',
    marginTop: 10,
    color: '#2980b9', // Blue color for emphasis
  },
  percentageText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2c3e50', // Make percentage stand out more
    position: 'absolute', // Positioned in the center
  },
});

export default App;
