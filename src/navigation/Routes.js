import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import CartScreen from "../screens/CartScreen";
import BottomTabNavigator from "./BottomTabNavigator";
import UserScreen from "../screens/UserScreen";
import AboutUs from "../screens/AboutUs";
import PaymentTerms from "../screens/PaymentTerms";
import ReturnPolicy from "../screens/ReturnPolicy";
import Terms from "../screens/Terms";
import PrivacyPolicy from "../screens/PrivacyPolicy";

const Stack = createStackNavigator();

export default AppStackNavigator = (props) => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="BottomTabNavigator">
        <Stack.Screen name="Store-Home" component={BottomTabNavigator} />
        <Stack.Screen name="User" component={UserScreen} />
        <Stack.Screen name="AboutUs" component={AboutUs} />
        <Stack.Screen name="PaymentTerms" component={PaymentTerms} />
        <Stack.Screen name="ReturnPolicy" component={ReturnPolicy} />
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
        <Stack.Screen name="Terms" component={Terms} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
