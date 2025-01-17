import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Modal,
  ScrollView,
  Dimensions,
} from "react-native";
import StatusBar from "./StatusBar";
import consignmentDataJson from './data.json';

const TrackingComponent = () => {
  const [consignmentNo, setConsignmentNo] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const consignmentData = consignmentDataJson?.data?.consignment || {};
  const trackingEvents = consignmentDataJson?.data?.tracking_events || [];

  const handleTrack = () => {
    if (consignmentNo === consignmentData.number) {
      setSelectedData({
        ...consignmentData,
        tracking_events: trackingEvents,
        curr_location: consignmentData.delivery_location,
        delivery_estimation: consignmentData.current_status,
        order_date: new Date(consignmentData.booked_on).toLocaleDateString(),
        courier_type: consignmentData.article_type,
        shipping_address: `Delivery Address, ${consignmentData.delivery_location}, Pincode: ${consignmentData.destination_pincode}`,
        pincode: consignmentData.destination_pincode,
      });
      setIsModalVisible(true);
    } else {
      setSelectedData({
        status: "Invalid Consignment Number",
        location: "N/A",
      });
      setIsModalVisible(true);
    }
    setShowDropdown(false);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedData(null);
    setConsignmentNo("");
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.trackingButton}
        onPress={() => setShowDropdown(!showDropdown)}
      >
        <Text style={styles.trackingButtonText}>Consignment No.</Text>
      </TouchableOpacity>
      {showDropdown && (
        <View style={styles.dropdownContainer}>
          <TextInput
            style={styles.dropdownInput}
            value={consignmentNo}
            onChangeText={setConsignmentNo}
            placeholder="Enter Consignment No."
          />
          <TouchableOpacity style={styles.dropdownButton} onPress={handleTrack}>
            <Text style={styles.dropdownButtonText}>Track Now</Text>
          </TouchableOpacity>
        </View>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <ScrollView contentContainerStyle={styles.modalContent}>
              {selectedData?.status === "Invalid Consignment Number" ? (
                <View style={styles.errorContainer}>
                  <Text style={styles.errorText}>Invalid Consignment Number</Text>
                </View>
              ) : (
                <>
                  <Text style={styles.modalTitle}>Detail Status</Text>
                  <Text style={styles.modalText}>Consignment No: {consignmentNo}</Text>
                  <StatusBar tracking_events={selectedData?.tracking_events} />
                  <View style={styles.modalDetailsRow}>
                    <View style={styles.detailColumn}>
                      <Text style={styles.detailLabel}>Delivery Estimation:</Text>
                      <Text style={styles.detailValue}>{selectedData?.delivery_estimation}</Text>
                      <Text style={styles.detailLabel}>Current Location:</Text>
                      <Text style={styles.detailValue}>{selectedData?.curr_location}</Text>
                    </View>
                    <View style={styles.detailColumn}>
                      <Text style={styles.detailLabel}>Order Date:</Text>
                      <Text style={styles.detailValue}>{selectedData?.order_date}</Text>
                      <Text style={styles.detailLabel}>Courier Type:</Text>
                      <Text style={styles.detailValue}>{selectedData?.courier_type}</Text>
                    </View>
                  </View>
                  <View style={styles.modalDetailsRow}>
                    <View style={styles.detailColumn}>
                      <Text style={styles.detailLabel}>Shipping Address:</Text>
                      <Text style={styles.detailValue}>{selectedData?.shipping_address}</Text>
                    </View>
                    <View style={styles.detailColumn}>
                      <Text style={styles.detailLabel}>Pincode:</Text>
                      <Text style={styles.detailValue}>{selectedData?.pincode}</Text>
                    </View>
                  </View>
                  <View style={styles.trackingEventsSection}>
                    <Text style={styles.trackingEventsSectionTitle}>Tracking Events</Text>
                    <ScrollView
                      horizontal={false}
                      style={styles.trackingEventsScrollView}
                    >
                      {selectedData?.tracking_events?.map((event, index) => (
                        <View key={event.id} style={styles.trackingEventItem}>
                          <View style={styles.trackingEventCircle}>
                            <Text style={styles.trackingEventCircleText}>{index + 1}</Text>
                          </View>
                          <View style={styles.trackingEventDetails}>
                            <Text style={styles.trackingEventText}>{event.event}</Text>
                            <Text style={styles.trackingEventLocation}>{event.office} ({event.pincode})</Text>
                            <Text style={styles.trackingEventDate}>{formatDate(event.tracked_at)}</Text>
                          </View>
                        </View>
                      ))}
                    </ScrollView>
                  </View>
                  <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                    <Text style={styles.closeButtonText}>Close</Text>
                  </TouchableOpacity>
                </>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    marginLeft: 20,
    width: 300,
    backgroundColor: "transparent",
  },
  trackingButton: {
    backgroundColor: "#E63946",
    paddingVertical: 9,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  trackingButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  dropdownContainer: {
    position: "absolute",
    top: 42,
    left: 0,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 20,
    padding: 16,
    zIndex: 1000,
    width: 300,
  },
  dropdownInput: {
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  dropdownButton: {
    backgroundColor: "#E63946",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignItems: "center",
  },
  dropdownButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    minHeight: Dimensions.get("window").height * 0.4,
  },
  modalContent: {
    alignItems: "flex-start",
    paddingHorizontal: 16,
  },
  modalTitle: {
    fontSize: 25,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#333333",
  },
  modalText: {
    fontSize: 18,
    marginVertical: 4,
    color: "#333333",
  },
  boldText: {
    fontWeight: "bold",
  },
  modalDetailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
  },
  detailColumn: {
    width: "50%",
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#212529",
  },
  detailValue: {
    fontSize: 14,
    color: "#495057",
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: "#E63946",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 20,
  },
  closeButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  trackingEventsSection: {
    marginTop: 20,
    width: "100%",
  },
  trackingEventsSectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333333",
  },
  trackingEventsScrollView: {
    maxHeight: 250,
  },
  trackingEventItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  trackingEventCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#E63946",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  trackingEventCircleText: {
    color: "white",
    fontWeight: "bold",
  },
  trackingEventDetails: {
    flex: 1,
  },
  trackingEventText: {
    fontSize: 16,
    color: "#212529",
    fontWeight: "bold",
  },
  trackingEventLocation: {
    fontSize: 14,
    color: "#6C757D",
    marginTop: 5,
  },
  trackingEventDate: {
    fontSize: 12,
    color: "#6C757D",
    marginTop: 5,
  },
  errorContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  errorText: {
    color: "#E63946",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default TrackingComponent;