import React, { useState, useEffect } from "react";
import { View, Text, Dimensions } from "react-native";
import Carousel from "react-native-snap-carousel";

let carouselItems = [
  {
    title: "Item 1",
    text: "Text 1"
  },
  {
    title: "Item 2",
    text: "Text 2"
  },
  {
    title: "Item 3",
    text: "Text 3"
  },
  {
    title: "Item 4",
    text: "Text 4"
  },
  {
    title: "Item 5",
    text: "Text 5"
  }
];

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

export default BannerRow = props => {
  const [dimensions, setDimensions] = useState({ window, screen });

  const onChange = ({ window, screen }) => {
    setDimensions({ window, screen });
  };
  useEffect(() => {
    Dimensions.addEventListener("change", onChange);
    return () => {
      Dimensions.removeEventListener("change", onChange);
    };
  });
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Carousel
        layout={"default"}
        ref={ref => (this.carousel = ref)}
        data={carouselItems}
        sliderWidth={dimensions.window.width}
        itemWidth={dimensions.window.width}
        renderItem={_renderItem}
        //useNativeDriver={false}
        //onSnapToItem = { index => this.setState({activeIndex:index}) }
      />
    </View>
  );
};

_renderItem = ({ item, index }) => {
  return (
    <View
      style={{
        backgroundColor: "floralwhite",
        borderRadius: 5,
        height: 250,
        padding: 50,
        marginLeft: 25,
        marginRight: 25
      }}
    >
      <Text style={{ fontSize: 30 }}>{item.title}</Text>
      <Text>{item.text}</Text>
    </View>
  );
};
