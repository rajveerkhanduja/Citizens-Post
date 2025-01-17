import { View, StyleSheet } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import Home from '../Screens/Home';
import Chatbot from '../Screens/Chatbot';
import Location from '../Screens/Location';
import Notification from '../Screens/Notification';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TabNavigation() {
  const Tab = createBottomTabNavigator();

  const notifications = [
    {
      id: 1,
      title: "Sent from your Twilio trial account",
      message: {
        category: "Metro to Metro",
        days: 4,
        transit_duration: "11 Days and 5 Hours + 1 day 8 hours + Weather Delays",
      },
      timestamp: "2024-12-04 10:00 AM",
      isRead: false,
    },
    {
      id: 2,
      title: "Shipping Update",
      message: {
        category: "International Shipping",
        days: 10,
        transit_duration: "15 Days + Customs Clearance + Weather Delays",
      },
      timestamp: "2024-12-03 3:30 PM",
      isRead: true,
    },
    {
      id: 3,
      title: "Delivery Notification",
      message: {
        category: "Express Delivery",
        days: 2,
        transit_duration: "2 Days and 12 Hours",
      },
      timestamp: "2024-12-02 9:00 AM",
      isRead: false,
    },
    {
      id: 4,
      title: "Reminder: Payment Due",
      message: {
        category: "Billing",
        days: 7,
        transit_duration: "N/A",
      },
      timestamp: "2024-12-01 8:00 AM",
      isRead: true,
    },
    {
      id: 5,
      title: "Package Delayed",
      message: {
        category: "Ground Shipping",
        days: 5,
        transit_duration: "8 Days + 1 day weather delay",
      },
      timestamp: "2024-11-30 6:45 PM",
      isRead: false,
    },
  ];
  

  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: styles.tabBarStyle,
          headerShown: false,
          tabBarShowLabel: false, // Remove labels for a minimalistic look
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
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
          name="Location"
          component={Location}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={[
                  styles.iconContainer,
                  focused ? styles.activeIconContainer : styles.inactiveIconContainer,
                ]}
              >
                <MaterialIcons name="local-post-office" size={40} color={focused ? 'white' : 'black'} />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Notification"
          component={(props) => <Notification {...props} notifications={notifications} />}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={[
                  styles.iconContainer,
                  focused ? styles.activeIconContainer : styles.inactiveIconContainer,
                ]}
              >
                <Ionicons name="notifications" size={40} color={focused ? 'white' : 'black'} />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Chatbot"
          component={Chatbot}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={[
                  styles.iconContainer,
                  focused ? styles.activeIconContainer : styles.inactiveIconContainer,
                ]}
              >
                <MaterialCommunityIcons
                  name="robot-happy"
                  size={40}
                  color={focused ? 'white' : 'black'}
                />
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent', // Transparent background
  },
  tabBarStyle: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Semi-transparent white
    borderRadius: 15,
    margin: 20,
    height: 70,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  activeIconContainer: {
    backgroundColor: '#E53935',
  },
  inactiveIconContainer: {
    backgroundColor: 'transparent',
  },
});