import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabBarIcon from "../../components/TabBarIcon";
import StoreNavigation from "./StoreNavigation";
import { connect } from "react-redux";
import CartScreen from "../screens/CartScreen";
import { FontAwesome5 } from "@expo/vector-icons";
import { primaryColor } from "../../assets/theme/global_colors";
import { Row } from "../../assets/components/Layouts";

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = "StoreNavigation";
//const INITIAL_ROUTE_NAME = 'Cart';

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

const bottomTabNavigator = (props) => {
  const { navigation, route } = props;
  const [dimensions, setDimensions] = useState({ window, screen });

  const onDimensionChange = ({ window, screen }) => {
    setDimensions({ window, screen });
  };

  useEffect(() => {
    Dimensions.addEventListener("change", onDimensionChange);
    return () => {
      Dimensions.removeEventListener("change", onDimensionChange);
    };
  });

  navigation.setOptions({
    headerStyle: [
      ComStyles.headerStyle,
      dimensions.window.width < 500
        ? MobStyles.headerStyle
        : PcStyles.headerStyle,
    ],
    headerTitle: (props) => (
      <View
        style={[
          ComStyles.headerTitle,
          dimensions.window.width < 500
            ? MobStyles.headerTitle
            : PcStyles.headerTitle,
        ]}
      >
        <Row>
          <Text
            style={[
              ComStyles.title,
              dimensions.window.width < 500 ? MobStyles.title : PcStyles.title,
            ]}
          >
            FreshKick
          </Text>
        </Row>
        <Row>
          <Text style={{ color: "#fff" }}>Store to Your Door</Text>
        </Row>
      </View>
    ),
    headerRight: () => (
      <View
        style={[
          ComStyles.headerRight,
          dimensions.window.width < 500
            ? MobStyles.headerRight
            : PcStyles.headerRight,
        ]}
      >
        <Row
          _style={[
            ComStyles.headerRowOne,
            dimensions.window.width < 500
              ? MobStyles.headerRowOne
              : PcStyles.headerRowOne,
          ]}
        >
          <TouchableOpacity
            onPress={() => {
              console.log("USERSCREEN");
              props.navigation.navigate("User");
            }}
            style={{
              alignItems: "center",
              paddingHorizontal: 15,
              flexDirection: "row",
            }}
          >
            <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
              SignIN
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            transparent
            onPress={() => {
              navigation.navigate("Cart");
            }}
          >
            <View
              style={{
                justifyContent: "center",
                paddingHorizontal: 10,
                borderWidth: 0,
              }}
            >
              <View
                style={{
                  backgroundColor: "#fff",
                  paddingHorizontal: 2,
                  paddingVertical: 1,
                  borderRadius: 10,
                  position: "absolute",
                  top: -12,
                  right: 0,
                  height: props.cart.length > 9 ? 20 : 15,
                  width: props.cart.length > 9 ? 20 : 15,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    color: "#0a0",
                  }}
                >
                  {props.cart.length ? props.cart.length : 0}
                </Text>
              </View>
              <FontAwesome5
                style={{
                  color: "#fff",
                  fontSize: 25,
                }}
                name="cart-arrow-down"
              />
            </View>
          </TouchableOpacity>
        </Row>
      </View>
    ),
  });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="StoreNavigation"
        component={StoreNavigation}
        options={{
          title: "",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="store-alt" title="Store" />
          ),
        }}
      />
      {/* <BottomTab.Screen
        name="Subscriptions"
        component={LinksScreen}
        options={{
          title: '',
          tabBarIcon: ({focused}) => (
            <TabBarIcon
              focused={focused}
              name="md-book"
              title="Subscriptions"
            />
          ),
        }}
      /> */}
      <BottomTab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          title: "",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="cart-arrow-down" title="Cart" />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

function getHeaderTitle(route) {
  const routeName =
    route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case "Home":
      return "FreshKick";
    case "Links":
      return "Links to learn more";
  }
}

import { StyleSheet } from "react-native";

const ComStyles = StyleSheet.create({
  headerStyle: {
    backgroundColor: primaryColor,
  },
  headerTitle: { paddingRight: 5, borderWidth: 0 },
  title: { fontWeight: "bold", fontSize: 20, color: "#fff" },
  headerRight: { borderWidth: 0, paddingRight: 20 },
  headerRowOne: {},
});

const MobStyles = StyleSheet.create({
  headerStyle: {},
  headerTitle: {},
  title: { marginTop: 1 },
  headerRight: {},
  headerRowOne: { marginTop: 1 },
});

const TabStyles = StyleSheet.create({
  headerStyle: {},
  title: {},
  headerRight: {},
  headerRowOne: {},
});

const PcStyles = StyleSheet.create({
  headerStyle: {},
  title: {},
  headerRight: {},
  headerRowOne: {},
});

export default BottomTabNavigator = connect((state) => ({
  cart: state.cartReducer.cartList,
}))(bottomTabNavigator);
