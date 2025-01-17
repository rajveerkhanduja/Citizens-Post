/* import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Colors from '../../Shared/Colors';

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";

const KpiDetailContent = ({ activeCategory }) => {

  const kpiContent = {
    1: {
      title: "Postal Network Reimagined",
      count: 1234567,
      lastUpdated: "last updated 23 Days ago",
      data: {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
          {
            data: [
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100
            ]
          }
        ]
      }
    },
    2: {
      title: "Mails",
      description: "Enhancing mail communication efficiency and reach.",
      details: "Advanced mail sorting and delivery systems to improve overall postal performance."
    },
    3: {
      title: "Citizen Centric Services",
      description: "Focusing on delivering user-friendly and accessible postal services.",
      details: "Prioritizing customer experience and accessibility in all postal service interactions."
    },
    4: {
      title: "Aspirational Districts",
      description: "Extending postal services to underserved and remote areas.",
      details: "Targeted approach to improve postal infrastructure in challenging geographical regions."
    },
    5: {
      title: "Public Grievances",
      description: "Efficient management and resolution of public complaints.",
      details: "Streamlined system for addressing and resolving customer concerns effectively."
    }
  };

  
  const content = kpiContent[activeCategory] || kpiContent[1];

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{content.title}</Text>
      <Text style={styles.descriptionText}>{content.count}</Text>
      <Text style={styles.detailsText}>{content.lastUpdated}</Text>
     
      <LineChart
        data={content.data}
        width={Dimensions.get("window").width}
        height={220}
        yAxisLabel="$"
        yAxisSuffix="k"
        yAxisInterval={1} 
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726"
          }
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width - 40, 
    backgroundColor: Colors.WHITE,
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.BLACK,
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 16,
    color: Colors.DARK_GRAY,
    marginBottom: 10,
  },
  detailsText: {
    fontSize: 14,
    color: Colors.BLACK,
  }
});

export default KpiDetailContent; */