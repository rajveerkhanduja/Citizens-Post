import React from 'react';
import { View, StyleSheet } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export default function StatusBar({ tracking_events = [] }) {
  // Determine status based on the last tracking event
  const getParcelStatus = () => {
    if (!tracking_events || tracking_events.length === 0) return 'booked';

    const lastEvent = tracking_events[tracking_events.length - 1];
    
    switch (lastEvent.event_type) {
      case 'ItemBooked':
      case 'ItemBagged':
        return 'booked';
      
      case 'ItemDispatched':
      case 'ItemReceived':
      case 'OutForDelivery':
        return 'in_transit';
      
      case 'ItemDelivered':
        return 'delivered';
      
      default:
        return 'booked';
    }
  };

  const status = getParcelStatus();

  // Determines icon and line colors based on status
  const getIconColor = (iconStatus) => {
    if (status === 'delivered') return '#E53935'; // Second_Primary for all icons if delivered
    
    // For booked and in_transit, different color logic
    const statusOrder = ['booked', 'in_transit', 'delivered'];
    return statusOrder.indexOf(iconStatus) <= statusOrder.indexOf(status) 
      ? '#E53935' 
      : '#E0E0E0';
  };

  return (
    <View style={styles.statusBarContainer}>
      {/* Package Icon */}
      <View 
        style={[
          styles.iconContainer, 
          { backgroundColor: getIconColor('booked') }
        ]}
      >
        <FontAwesome5 
          name="box-open" 
          size={24} 
          color={getIconColor('booked') === '#E53935' ? 'white' : 'black'} 
        />
      </View>

      {/* Connecting Line 1 */}
      <View 
        style={[
          styles.line, 
          { backgroundColor: status === 'delivered' || status === 'in_transit' ? '#E53935' : '#E0E0E0' }
        ]} 
      />

      {/* Truck Icon */}
      <View 
        style={[
          styles.iconContainer, 
          { backgroundColor: getIconColor('in_transit') }
        ]}
      >
        <Feather 
          name="truck" 
          size={24} 
          color={getIconColor('in_transit') === '#E53935' ? 'white' : 'black'} 
        />
      </View>

      {/* Connecting Line 2 */}
      <View 
        style={[
          styles.line, 
          { backgroundColor: status === 'delivered' ? '#E53935' : '#E0E0E0' }
        ]} 
      />

      {/* Delivery Dot Icon */}
      <View 
        style={[
          styles.iconContainer, 
          { backgroundColor: getIconColor('delivered') }
        ]}
      >
        <FontAwesome5 
          name="dot-circle" 
          size={24} 
          color={getIconColor('delivered') === '#E53935' ? 'white' : 'black'} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  statusBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E0E0E0',
  },
  line: {
    width: 80,
    height: 4,
    backgroundColor: '#E0E0E0',
  },
});