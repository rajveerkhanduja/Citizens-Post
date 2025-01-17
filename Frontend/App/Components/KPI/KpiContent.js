import React from "react";
import { View, Text, StyleSheet, Button, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import Colors from "../../Shared/Colors";

const KpiContent = ({ route, navigation }) => {
  const { kpiData } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{kpiData.title}</Text>
      <Text style={styles.count}>{kpiData.count}</Text>
      <Text style={styles.details}>{kpiData.lastUpdated}</Text>

      <LineChart
        data={kpiData.data}
        width={Dimensions.get("window").width - 40}
        height={220}
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: { borderRadius: 16 },
        }}
        bezier
        style={{ marginVertical: 8, borderRadius: 16 }}
      />

      <Button title="Back" style={{ backgroundColor:Colors.SECOND_PRIMARY}} onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  count: { fontSize: 20, fontWeight: "900", color: "#555" },
  details: { fontSize: 16, color: "#777", marginBottom: 20 },
});

export default KpiContent;