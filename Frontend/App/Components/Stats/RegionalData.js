import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export default function RegionalData() {

  const regionalData = {
    dailyMails: 345,
    change: "+2.34",
    customerSatisfaction: 75,
    distance: 12,
    loaction: "Gwalior",
    pincode: "522502"
  }

  return (
    <View style={styles.mainContainer}>
      <View style={{}}>
        <Text style={{ fontSize: 16, fontWeight: 800, marginBottom: -2 }}>Regional Post</Text>
        <Text style={{ fontSize: 12, fontWeight: 500 }}>Your regional post details</Text>
      </View>


      <View style={styles.subContainer}>
        <View style={styles.dataContainer}>

          <View style={{ marginTop: 10, justifyContent: "flex-end", }}>
            <Text style={{ fontSize: 14, fontWeight: 500 }}>Daily Mails</Text>
            <View style={{ flexDirection: "row", alignItems: "baseline", gap: 5, }}>


              {/* dailyMails */}
              <Text style={{ fontSize: 33, fontWeight: 500 }}>{regionalData.dailyMails}</Text>
              <Text style={{ fontSize: 14, fontWeight: 500, alignContent: "bottom" }}>{regionalData.change}%</Text>
            </View>
          </View>


          {/* customer satisfaction */}
          <View style={{ marginTop: 5, justifyContent: "flex-end", }}>
            <Text style={{ fontSize: 14, fontWeight: 500, width: "50%" }}>Customer Satisfaction</Text>
            <View style={{ flexDirection: "row", alignItems: "baseline", gap: 5, }}>
              <FontAwesome6 name="circle-dot" size={13} color="green" style={{ width: 15 }} />
              <Text style={{ fontSize: 23, fontWeight: 500 }}>{regionalData.customerSatisfaction}%</Text>
            </View>
          </View>


          {/* average distance */}
          <View style={{ marginTop: 5, justifyContent: "flex-end", }}>
            <Text style={{ fontSize: 13, fontWeight: 500 }}>Average Distance</Text>
            <Text style={{ fontSize: 23, fontWeight: 500 }}>{regionalData.distance}km</Text>
          </View>
        </View>



        <View style={{ alignItems: "center", width: "55%" }}>
          <Image source={require('../../../assets/locationmarker.png')} style={styles.markerImage}></Image>
          <View style={{flexDirection:"row"}}>
            <View style={{ width: "100%" }}>

              <View style={{ marginTop: 5, justifyContent: "flex-end", }}>
                <Text style={{ fontSize: 14, fontWeight: 500 }}>Loaction</Text>
                <Text style={{ fontSize: 25, fontWeight: 500 }}>{regionalData.loaction}</Text>
              </View>


              <View>
                <Text style={{ fontSize: 15, fontWeight: 500 }}>Pincode</Text>
                <Text style={{ fontSize: 25, fontWeight: 500 }}>{regionalData.pincode}</Text>
              </View>
            </View>


            <View style={{ width: "0%" }}>

              {/* <View style={{ marginTop: 5, justifyContent: "flex-end", }}>
                <Text style={{ fontSize: 14, fontWeight: 500 }}>Branch Type</Text>
                <Text style={{ fontSize: 25, fontWeight: 500 }}>{regionalData.loaction}</Text>
              </View>


              <View>
                <Text style={{ fontSize: 15, fontWeight: 500 }}>Pincode</Text>
                <Text style={{ fontSize: 25, fontWeight: 500 }}>{regionalData.pincode}</Text>
              </View> */}
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    width: "95%",
    backgroundColor: "#fff",
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 20,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Shadow for Android
    elevation: 5,
  },
  subContainer: {
    marginLeft: 10,
    flexDirection: "row",
    width: "100%",
  },
  dataContainer: {
    width: "45%",
    height: "100%",
  },
  markerImage: {
    width: 110,
    height: 100,
  },
});
