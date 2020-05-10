import React from "react";
import { View, Text, Dimensions } from "react-native";

const window = Dimensions.get("window");

export default AboutUs = (props) => {
  return (
    <View
      style={[
        ComStyles.container,
        window.width < 500 ? MobStyles.container : PcStyles.container,
      ]}
    >
      <Text>About Us</Text>
    </View>
  );
};

import { StyleSheet } from "react-native";

const ComStyles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderWidth: 0,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
});

const MobStyles = StyleSheet.create({
  container: {},
});

const TabStyles = StyleSheet.create({
  container: {},
});

const PcStyles = StyleSheet.create({
  container: {},
});
