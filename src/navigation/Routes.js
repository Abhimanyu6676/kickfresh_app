import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import LinksScreen from "../screens/LinksScreen";
import BottomTabNavigator from "./BottomTabNavigator";

const Stack = createStackNavigator();

export default function AppStackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={BottomTabNavigator} />
        <Stack.Screen name="Links" component={LinksScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
