import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import CartScreen from "../screens/CartScreen";
import BottomTabNavigator from "./BottomTabNavigator";
import UserScreen from "../screens/UserScreen";

const Stack = createStackNavigator();

export default AppStackNavigator = props => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="BottomTabNavigator">
        <Stack.Screen
          name="BottomTabNavigator"
          component={BottomTabNavigator}
        />
        <Stack.Screen name="User" component={UserScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
