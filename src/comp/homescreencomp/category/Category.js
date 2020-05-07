import React, { useState } from "react";
import { Text, TouchableOpacity, Image, View } from "react-native";
import { Row, Col, Left, Body, Right, Accordion, Grid } from "native-base";
import { FontAwesome } from "@expo/vector-icons";
import GridView from "react-native-super-grid";

export default Category = (props) => {
  let { navigation, dimensions } = props;
  const CustomHeader = (props) => {
    return (
      <View
        style={{
          flexDirection: "row",
          marginHorizontal: 3,
          borderRadius: 5,
          marginTop: 15,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: 0.25,
          shadowRadius: 5,
          elevation: 3,
          padding: 2,
        }}
      >
        <Col style={{ overflow: "hidden", flex: 4 }}>
          <Row
            style={{
              alignItems: "center",
              paddingHorizontal: 20,
              paddingVertical: 10,
            }}
          >
            <View
              style={{
                height: 70,
                width: 100,
                borderWidth: 0,
                borderColor: "#00f",
              }}
            >
              <Image
                style={{ width: 100, height: 70 }}
                source={{
                  uri:
                    "http://192.168.1.90:3000/ProductImages/" +
                    props.Category +
                    "/" +
                    props.Category +
                    ".png",
                }}
              />
            </View>
            <View style={{ marginLeft: 20 }}>
              <Row>
                <View
                  style={{
                    backgroundColor: "#0a0",
                    borderRadius: 10,
                    paddingHorizontal: 5,
                    paddingVertical: 2,
                    justifyContent: "center",
                    marginBottom: 5,
                  }}
                >
                  <Text
                    style={{ fontSize: 10, fontWeight: "600", color: "#fff" }}
                  >
                    offer upto 20%
                  </Text>
                </View>
              </Row>
              <Row>
                <Text
                  style={{ fontSize: 15, color: "#aaa", fontWeight: "600" }}
                >
                  {props.Category}
                </Text>
              </Row>
              <Row>
                <Text style={{ color: "#aaa", fontSize: 10 }}>
                  {props.SubCategory.map((Item) => {
                    return Item.SubCategory + ", ";
                  })}
                </Text>
              </Row>
            </View>
          </Row>
        </Col>

        <Col
          style={{
            borderColor: "#0a0",
            borderWidth: 0,
            flex: 1,
            justifyContent: "center",
            alignItems: "flex-end",
          }}
        >
          <View
            style={{
              height: 70,
              width: 60,
              justifyContent: "center",
              alignItems: "center",
              borderLeftWidth: 1,
              borderColor: "#aaa",
            }}
          >
            <FontAwesome
              name="chevron-down"
              style={{ color: "#aaa", fontSize: 22 }}
            />
          </View>
        </Col>
      </View>
    );
  };

  const CustomContent = (props) => {
    return (
      <View style={{ marginLeft: 0 }}>
        <GridView
          itemDimension={100}
          spacing={10}
          items={props.SubCategory}
          renderItem={(item, index) => (
            <TouchableOpacity
              key={index}
              style={{ alignSelf: "center" }}
              onPress={() => {
                navigation.navigate("SubCategory", {
                  SubCategory: item.item,
                  CategoryList: props.SubCategory,
                  dimensions: dimensions,
                });
              }}
            >
              <View style={{ width: 100 }}>
                <View
                  //IMAGE
                  style={{
                    height: 100,
                    width: 100,
                    borderWidth: 0,
                  }}
                >
                  <Image
                    style={{ width: 100, height: 100 }}
                    source={{
                      uri:
                        "http://192.168.1.90:3000/ProductImages/" +
                        props.Category +
                        "/" +
                        item.item.SubCategory +
                        ".png",
                    }}
                  />
                </View>
                <Text
                  style={{
                    color: "#aaa",
                    fontSize: 10,
                    fontWeight: "600",
                    textAlign: "center",
                  }}
                >
                  {item.item.SubCategory}
                </Text>
                <View
                  style={{
                    backgroundColor: "#0a0",
                    paddingHorizontal: 5,
                    paddingVertical: 2,
                    alignSelf: "center",
                    borderRadius: 10,
                  }}
                >
                  <Text
                    style={{ fontWeight: "600", fontSize: 8, color: "#fff" }}
                  >
                    upto 20% off
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  };

  return (
    <View
      style={[
        ComStyles.container,
        props.dimensions.window.width < 500
          ? MobStyles.container
          : PcStyles.container,
      ]}
    >
      <Accordion
        style={{ backgroundColor: "transparent" }}
        dataArray={props.data}
        animation={true}
        expanded={true}
        renderHeader={CustomHeader}
        renderContent={CustomContent}
      />
    </View>
  );
};

import { StyleSheet } from "react-native";

const ComStyles = StyleSheet.create({
  container: {},
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
