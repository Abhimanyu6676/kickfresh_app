import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";
import { View, Text } from "react-native";
import TabBarIcon from "../../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import LinksScreen from "../screens/LinksScreen";
import {
  Container,
  Left,
  Button,
  Icon,
  Body,
  Title,
  Right,
  Row,
  Col
} from "native-base";

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = "Home";

export default function BottomTabNavigator({ navigation, route }) {
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Store",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-code-working" />
          )
        }}
      />
      <BottomTab.Screen
        name="Links"
        component={LinksScreen}
        options={{
          title: "Cart",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-book" />
          )
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName =
    route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case "Home":
      return (
        <Container>
          <Left></Left>
          <Body>
            <Title style={{ color: "#aaa" }}>FreshKick</Title>
          </Body>
          <Right></Right>
        </Container>
      );
    case "Links":
      return "Links to learn more";
  }
}
