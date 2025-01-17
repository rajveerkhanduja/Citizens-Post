import "react-native-gesture-handler";
import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "./App/Shared/Colors";

// Drawer Components
import AboutApp from "./App/Navigation/Drawer Pages/About.js";
import Language from "./App/Navigation/Drawer Pages/Language.js";
import PrivacyPolicy from "./App/Navigation/Drawer Pages/PrivacyPolicy.js";
import Settings from "./App/Navigation/Drawer Pages/Settings.js";
import TermsCo from "./App/Navigation/Drawer Pages/TermsnCo.js";
import { UserLocationProvider } from "./App/Context/UserLocationContext"; // Import the context provider
import LogoutHandler from "./App/LogoutHandler.js";

// Tab and Other Screens
import TabNavigation from "./App/Navigation/TabNavigation";
import HelpSupport from "./App/Components/Help&Support/SupportDetails.js";
import KpiDashboard from "./App/Components/KPI/KpiDetail.js";
import YourServices from "./App/Components/YourServices/YourServices.js";
import OpeningPage from "./App/Screens/opening.js";
import Login from "./App/Screens/login.js";
import Signup from "./App/Screens/Signup.js";
import UserSignup1 from "./App/Screens/user/UserSignup.js";
import KpiContent from "./App/Components/KPI/KpiContent.js";
import NotificationDetails from "./App/Components/Notifications/NotificationDetails.js";
import FeedbackForm from "./App/Components/Help&Support/FeedbackForm.js";
import TrackYourService from "./App/Components/TrackYourService/TYS.js";
import ServiceStandards from "./App/Components/YourServices/cardDetails/serviceStandards.js"
import countryWise from "./App/Components/YourServices/cardDetails/countryWise.js"
import PostOfficeSavingsBank from "./App/Components/YourServices/cardDetails/PostOfficeSavingsBank.js";
import PostOfficeSavingsBankCBS from "./App/Components/YourServices/cardDetails/PostOfficeSavingsBankCBS.js";
import ServiceStandardsofPublicGrievanceRedress from "./App/Components/YourServices/cardDetails/ServiceStandardsofPublicGrievanceRedress.js"
import financialServices from "./App/Components/YourServices/cardDetails/financialServices.js"
import stamp from "./App/Components/YourServices/cardDetails/stamp.js"
import insurance from "./App/Components/YourServices/cardDetails/insurance.js"

// DOP components
import CircleTabNavigator from "./App/Navigation/DOPTabNavigators/CircleTabNavigator.js"
import CPMGTabNavigator from "./App/Navigation/DOPTabNavigators/CPMGTabNavigator.js"
import RegionalTabNavigator from "./App/Navigation/DOPTabNavigators/RegionalTabNavigator.js"
import DevisionTabNavigator from "./App/Navigation/DOPTabNavigators/DivisionTabNavigator.js"
import GraphDetails from "./App/DopComponents/Home/GraphDetailScreen.js"


// Custom Header Component
function CustomHeader({ navigation }) {
  const userProfile = require("./assets/user.png"); // Adjust the path to your user image
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Ionicons name="menu" size={24} color="white" />
      </TouchableOpacity>
      <View style={styles.userInfo}>
        <Text style={styles.userName}>Rakesh Kumar</Text>
        <Text style={styles.userLocation}>Guntur</Text>
      </View>
      <Image source={userProfile} style={styles.profileImage} />
    </View>
  );
}

// Drawer Navigator
function DrawerNavigator() {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      screenOptions={({ navigation }) => ({
        header: () => <CustomHeader navigation={navigation} />,
        drawerStyle: {
          backgroundColor: "#fff",
        },
        drawerActiveTintColor: "#007bff",
        drawerInactiveTintColor: "#555",
      })}
    >
      <Drawer.Screen
        name="Home"
        component={TabNavigation}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="home" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="About Us"
        component={AboutApp}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="info" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Language"
        component={Language}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="language" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Privacy Policy"
        component={PrivacyPolicy}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="policy" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="settings" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Terms & Conditions"
        component={TermsCo}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="gavel" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="Logout"
        component={LogoutHandler}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="logout" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

// Main App Component
export default function App() {
  const Stack = createStackNavigator();

  return (
    <UserLocationProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="OpeningPage">
          <Stack.Screen
            name="CircleTabNavigator"
            component={CircleTabNavigator}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="CPMGTabNavigator"
            component={CPMGTabNavigator}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="RegionalTabNavigator"
            component={RegionalTabNavigator}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="DevisionTabNavigator"
            component={DevisionTabNavigator}
            options={{ headerShown: false }}
          />

          

          <Stack.Screen
            name="OpeningPage"
            component={OpeningPage}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="UserSignup1"
            component={UserSignup1}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DrawerNavigator"
            component={DrawerNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="KpiContent"
            component={KpiContent}
            options={{ title: "KPI Details" }}
          />

          <Stack.Screen
            name="HelpSupport"
            component={HelpSupport}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="KpiDashboard"
            component={KpiDashboard}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="TrackYourService"
            component={TrackYourService}
            options={{ headerShown: false }}
          />

          {/* Additional Screens */}
          <Stack.Screen
            name="KpiDetails"
            component={KpiContent}
            options={{ title: "KPI Details" }}
          />

          <Stack.Screen
            name="YourServices"
            component={YourServices}
            options={{ title: "Your Services" }}
          />

          <Stack.Screen
            name="NotificationDetails"
            component={NotificationDetails}
            options={{ title: "Notification Details" }}
          />

          <Stack.Screen
            name="FeedbackForm"
            component={FeedbackForm}
            options={{ title: "Feedback Form" }}
          />

          <Stack.Screen
            name="ServiceStandards"
            component={ServiceStandards}
            options={{ title: "Service Standards" }}
          />

          <Stack.Screen
            name="countryWise"
            component={countryWise}
            options={{ title: "country Wise" }}
          />

          <Stack.Screen
            name="PostOfficeSavingsBank"
            component={PostOfficeSavingsBank}
            options={{ title: "PostOfficeSavingsBank" }}
          />
          <Stack.Screen
            name="PostOfficeSavingsBankCBS"
            component={PostOfficeSavingsBankCBS}
            options={{ title: "PostOfficeSavingsBankCBS" }}
          />
          <Stack.Screen
            name="ServiceStandardsofPublicGrievanceRedress"
            component={ServiceStandardsofPublicGrievanceRedress}
            options={{ title: "ServiceStandardsofPublicGrievanceRedress" }}
          />
          <Stack.Screen
            name="financialServices"
            component={financialServices}
            options={{ title: "financialServices" }}
          />
          <Stack.Screen
            name="stamp"
            component={stamp}
            options={{ title: "stamp" }}
          />
          <Stack.Screen
            name="insurance"
            component={insurance}
            options={{ title: "insurance" }}
          />


          <Stack.Screen
            name="GraphDetails"
            component={GraphDetails}
            options={{ title: "GraphDetails" }}
          />


        </Stack.Navigator>
      </NavigationContainer>
    </UserLocationProvider>
  );
}

// Styles
const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.SECOND_PRIMARY,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 10,
    height: 60,
    marginTop: 45,
  },
  userInfo: {
    flex: 4,
    alignItems: "flex-end",
  },
  userName: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  userLocation: {
    color: "white",
    fontSize: 14,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 10,
  },
});