import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";

import Colors from "../constants/Colors";
import { Text, View } from "react-native";

export default function TabBarIcon(props) {
  return (
    /*  <Ionicons
      name={props.name}
      size={30}
      style={{ marginBottom: -3 }}
      color={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    /> */
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <FontAwesome5
        style={{
          color: props.focused ? Colors.tabIconSelected : Colors.tabIconDefault,
          marginVertical: 1,
          fontSize: 20,
        }}
        name={props.name}
      />
      <Text
        style={{
          color: props.focused ? Colors.tabIconSelected : Colors.tabIconDefault,
          fontSize: 12,
          marginBottom: 2,
        }}
      >
        {props.title}
      </Text>
    </View>
  );
}
