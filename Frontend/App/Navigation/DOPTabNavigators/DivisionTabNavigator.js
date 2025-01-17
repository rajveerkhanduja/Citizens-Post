import { View, StyleSheet } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';





import DOPHome from "../../Screens/DOP/Division/DivisionHome.js";
import PerformanceMetrics from '../../Screens/DOP/Division/DivisionPerformance.js';
import LocalPerformance from '../../Screens/DOP/Division/DivisionLocalPerformance.js';
import AlertComponent from '../../Screens/DOP/Division/DivisionAlertSystem.js';

export default function TabNavigation() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: styles.tabBarStyle,
        headerShown: false,
        tabBarShowLabel: false, // Remove labels for minimalistic look
      }}
    >
      <Tab.Screen
        name="Home"
        component={DOPHome}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={[
                styles.iconContainer,
                focused ? styles.activeIconContainer : styles.inactiveIconContainer,
              ]}
            >
              <Entypo name="home" size={40} color={focused ? 'white' : 'black'} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Performance"
        component={PerformanceMetrics}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={[
                styles.iconContainer,
                focused ? styles.activeIconContainer : styles.inactiveIconContainer,
              ]}
            >
              <Ionicons name="stats-chart-sharp" size={24} color={focused ? 'white' : 'black'} />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Local Performance"
        component={LocalPerformance}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={[
                styles.iconContainer,
                focused ? styles.activeIconContainer : styles.inactiveIconContainer,
              ]}
            >
              <MaterialIcons name="query-stats" size={24} color={focused ? 'white' : 'black'} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Alerts"
        component={AlertComponent}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={[
                styles.iconContainer,
                focused ? styles.activeIconContainer : styles.inactiveIconContainer,
              ]}
            >
              <Ionicons name="alert-circle" size={24} color={focused ? 'white' : 'black'} />
            </View>
          ),
        }}
      />
      

    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 15,
    margin: 20,
    height: 70,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center', // Center the items in the tab bar
  },
  iconContainer: {
    width: 60, // Adjusted width for proper centering
    height: 60, // Adjusted height for proper centering
    borderRadius: 15,
    alignItems: 'center', // Center icon horizontally
    justifyContent: 'center', // Center icon vertically
    marginBottom: 30, // Added margin for alignment within tab bar
  },
  activeIconContainer: {
    backgroundColor: '#E53935',
  },
  inactiveIconContainer: {
    backgroundColor: 'transparent',
  },
});
