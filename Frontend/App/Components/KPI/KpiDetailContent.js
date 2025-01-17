import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import { useNavigation } from "@react-navigation/native";

const KpiDetailContent = ({ activeCategory, cardData = null }) => {
  const navigation = useNavigation();

  const kpiContent = {
    1: [
      {
        title: "December 2024",
        lastUpdated: "Last updated As on 08-12-24",
        data: {
          labels: ["01", "02", "03", "04", "05", "06", "07", "08"],
          datasets: [
            {
              data: [4, 5779, 4735, 8252, 6456, 7225, 6720, 0],
            },
          ],
        },
      },
      {
        title: "November 2024",
        lastUpdated: "Last updated As on 08-12-24",
        data: {
          labels: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30"],
          datasets: [
            {
              data: [5182, 5097, 0, 4049,  5082, 6456, 6375, 6314, 7553, 4, 7320, 8718, 9899, 13649,  13, 2728, 1, 7543,8736,8654,11635, 11352, 9753, 11, 7407, 8350, 10149, 9766, 9164, 8612],
            },
          ],
        },
      },
    ],
    2: [
      {
        title: "Largest Postal Network in the world",
        count: "1,64,972",
        lastUpdated: "Last updated As on 31-03-24",
        data: {
          labels: ["January", "February", "March", "April", "May", "June"],
          datasets: [
            {
              data: [45, 60, 75, 30, 55, 90],
            },
          ],
        },
      },
      {
        title: "Smart phones in 2,23,523 ICT enabled Post Offices ",
        count: "1,54,697",
        lastUpdated: "Last updated As on 31-03-24",
        data: {
          labels: [
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
          datasets: [
            {
              data: [85, 95, 70, 80, 100, 60],
            },
          ],
        },
      },
      {
        title: "Employees and Gramin Dak Sevak",
        count: 417114,
        lastUpdated: "Last updated As on 31-03-24",
        data: {
          labels: ["January", "February", "March", "April", "May", "June"],
          datasets: [
            {
              data: [45, 60, 75, 30, 55, 90],
            },
          ],
        },
      },
      {
        title: "IT Solutions under IT Modernization Project",
        count: 2233467,
        lastUpdated: "Last updated As on 31-03-24",
        data: {
          labels: ["January", "February", "March", "April", "May", "June"],
          datasets: [
            {
              data: [45, 60, 75, 30, 55, 90],
            },
          ],
        },
      },
    ],

    3: [
      {
        title: "No. of Registered Letters Booked",
        count: "16.48 Crore",
        lastUpdated: "Last updated Upto November 2024",
        data: {
          labels: ["January", "February", "March", "April", "May", "June"],
          datasets: [
            {
              data: [45, 60, 75, 30, 55, 90],
            },
          ],
        },
      },
      {
        title: "No. of Registered Letters Delivered",
        count: "17.39 Crore",
        lastUpdated: "Last updated Upto November 2024",
        data: {
          labels: [
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
          datasets: [
            {
              data: [85, 95, 70, 80, 100, 60],
            },
          ],
        },
      },
      {
        title: "Postman Mobile App Deliveries",
        count: "6.67 Crore",
        lastUpdated: "Last updated Upto November 2024",
        data: {
          labels: ["January", "February", "March", "April", "May", "June"],
          datasets: [
            {
              data: [45, 60, 75, 30, 55, 90],
            },
          ],
        },
      },
      {
        title: "No. of Speed Post Articles Delivered",
        count: "40.60 Crore",
        lastUpdated: "Last updated Upto November 2024",
        data: {
          labels: ["January", "February", "March", "April", "May", "June"],
          datasets: [
            {
              data: [45, 60, 75, 30, 55, 90],
            },
          ],
        },
      },
      {
        title: "Number of Speed Post articles booked",
        count: "40.82 Crore",
        lastUpdated: "Last updated Upto November 2024",
        data: {
          labels: ["January", "February", "March", "April", "May", "June"],
          datasets: [
            {
              data: [45, 60, 75, 30, 55, 90],
            },
          ],
        },
      },
    ],

    4: [
      {
        title: "Aadhaar Enrolment and Updation Centre",
        count: "13,352",
        lastUpdated: "Last updated As on 30 November 2024",
        data: {
          labels: ["January", "February", "March", "April", "May", "June"],
          datasets: [
            {
              data: [45, 60, 75, 30, 55, 90],
            },
          ],
        },
      },
      {
        title: "Post Office Passport Seva Kendras",
        count: "429",
        lastUpdated: "Last updated As on 30 November 2024",
        data: {
          labels: [
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
          datasets: [
            {
              data: [85, 95, 70, 80, 100, 60],
            },
          ],
        },
      },
      {
        title: "Value of utility bills payments",
        count: "1235.43 Crore",
        lastUpdated: "Last updated As on 30 November 2024",
        data: {
          labels: ["January", "February", "March", "April", "May", "June"],
          datasets: [
            {
              data: [45, 60, 75, 30, 55, 90],
            },
          ],
        },
      },
      {
        title: "Direct Benefit Transfers",
        count: "621.823 Crore",
        lastUpdated: "Last updated As on 30 November 2024",
        data: {
          labels: ["January", "February", "March", "April", "May", "June"],
          datasets: [
            {
              data: [45, 60, 75, 30, 55, 90],
            },
          ],
        },
      },
    ],

    5: [
      {
        title: "Post Office Passport Seva Kendras in Aspirational Districts",
        count: 65,
        lastUpdated: "Last updated As on 30 November 2024",
        data: {
          labels: ["January", "February", "March", "April", "May", "June"],
          datasets: [
            {
              data: [45, 60, 75, 30, 55, 90],
            },
          ],
        },
      },
      {
        title: "Post offices with Core Banking Solutions",
        count: "2,265",
        lastUpdated: "Last updated As on 30-11-2024",
        data: {
          labels: [
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
          datasets: [
            {
              data: [85, 95, 70, 80, 100, 60],
            },
          ],
        },
      },
      {
        title: "Branch post offices using ICT",
        count: "18,061",
        lastUpdated: "Last updated As on 30-11-2024",
        data: {
          labels: ["January", "February", "March", "April", "May", "June"],
          datasets: [
            {
              data: [45, 60, 75, 30, 55, 90],
            },
          ],
        },
      },
      {
        title:
          "Aadhaar Enrolment and Updation Centre in Aspirational Districts",
        count: "1,116",
        lastUpdated: "Last updated As on 30-11-2024",
        data: {
          labels: ["January", "February", "March", "April", "May", "June"],
          datasets: [
            {
              data: [45, 60, 75, 30, 55, 90],
            },
          ],
        },
      },
    ],

    6: [
      {
        title: "RTI",
        subTitle1: "RTI Received:",
        count1: "11,313",
        SubTitle2: "RTI Replied:",
        count2: "11,021",
        lastUpdated: "Last updated As In November 2024",
        data: {
          labels: ["January", "February", "March", "April", "May", "June"],
          datasets: [
            {
              data: [45, 60, 75, 30, 55, 90],
            },
          ],
        },
      },
      {
        title: "Twitter",
        subTitle1: "Received:",
        count1: "22,619",
        SubTitle2: "Resolved:",
        count2: " 21,647",
        lastUpdated: "Last updated As In November 2024",
        data: {
          labels: ["January", "February", "March", "April", "May", "June"],
          datasets: [
            {
              data: [45, 60, 75, 30, 55, 90],
            },
          ],
        },
      },
      {
        title: "CPGRAMS Complaints",
        subTitle1: "Received:",
        count1: "5,264",
        SubTitle2: "Resolved:",
        count2: "5,408",
        lastUpdated: "Last updated As In November 2024",
        data: {
          labels: ["January", "February", "March", "April", "May", "June"],
          datasets: [
            {
              data: [45, 60, 75, 30, 55, 90],
            },
          ],
        },
      },
      {
        title: "Call Centre",
        subTitle1: "Call Received:",
        count1: "6,38,761",
        SubTitle2: "Complaints Recieved:",
        count2: "14,925",
        lastUpdated: "Last updated As In November 2024",
        data: {
          labels: ["January", "February", "March", "April", "May", "June"],
          datasets: [
            {
              data: [45, 60, 75, 30, 55, 90],
            },
          ],
        },
      },
    ],
  };

  const content = cardData
    ? cardData
    : activeCategory
    ? kpiContent[activeCategory] || []
    : [];

    return (
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {content.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.container}
            onPress={() => navigation.navigate("KpiContent", { kpiData: item })} // Pass KPI data
          >
            <View style={styles.subContainer}>
              <Text style={styles.titleText}>{item.title}</Text>
              <Text style={styles.countNumber}>{item.count}</Text>
            </View>
            <Text style={styles.detailsText}>{item.lastUpdated}</Text>
            {item.data && (
              <LineChart
                data={item.data} // Display full graph data
                width={Dimensions.get("window").width - 80} // Adjust for full width
                height={220}
                chartConfig={{
                  backgroundColor: "#e26a00",
                  backgroundGradientFrom: "#fb8c00",
                  backgroundGradientTo: "#ffa726",
                  decimalPlaces: 0,
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  style: { borderRadius: 8 },
                  propsForDots: {
                    r: "6",
                    strokeWidth: "2",
                    stroke: "#ffa726",
                  },
                }}
                bezier
                style={{ marginVertical: 8, borderRadius: 8 }}
              />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };
  
  const styles = StyleSheet.create({
    scrollContainer: {
      padding: 20,
      paddingBottom: 250,
    },
    container: {
      backgroundColor: "#fff",
      padding: 10,
      borderRadius: 10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      marginBottom: 20,
    },
    subContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    titleText: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#333",
      flexWrap: "wrap",
      width: "65%",
    },
    countNumber: {
      fontSize: 18,
      fontWeight: "900",
      color: "#555",
    },
    detailsText: {
      fontSize: 12,
      color: "#777",
    },
  });
  
  export default KpiDetailContent;  