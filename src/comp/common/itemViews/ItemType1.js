import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import QuantityView2 from "../quantityViews/QuantityView2";
import { Row } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { cartListAction } from "../../../redux/actions/CartListAction";
import { AddToCart, RemoveFromCart } from "../../../services/CartUpdate";
import ImageLoad from "react-native-image-placeholder";
import { server } from "../../../services/REST";

export default ItemType1 = (props) => {
  const [quantity, setQuantity] = useState(0);
  const cart = useSelector((state) => state.cartReducer.cartList);
  const dispatch = useDispatch();

  useEffect(() => {
    //Effect
    let productQty = 0;
    cart.map((item, index) => {
      if (item.ProductName == props.item.ProductName) {
        productQty = item.currQty ? item.currQty : 0;
      }
    });
    setQuantity(productQty);
    return () => {
      //CleanUp
    };
  });

  const Add = () => {
    let r = AddToCart({
      Product: props.item,
      Cart: cart,
      Qty: 1,
    });
    //setQuantity(r.rtrQty ? r.rtrQty : 0);
    console.log("updateCart>> " + JSON.stringify(r.cartList));
    dispatch(cartListAction({ cartList: r.cartList }));
  };

  const Remove = () => {
    let r = RemoveFromCart({
      Cart: cart,
      Qty: 1,
      ProductName: props.item.ProductName,
    });
    //setQuantity(r.rtrQty ? r.rtrQty : 0);
    console.log("updateCart>> " + JSON.stringify(r.cartList));
    dispatch(cartListAction({ cartList: r.cartList }));
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
      <View
        style={{
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          padding: 10,
        }}
      >
        <View
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            alignSelf: "flex-start",
            backgroundColor: "#0a0",
            borderRadius: 10,
            paddingHorizontal: 4,
            paddingVertical: 2,
            zIndex: 2,
          }}
        >
          <Text style={{ fontSize: 10, fontWeight: "600", color: "#fff" }}>
            15% off
          </Text>
        </View>
        <View
          style={[
            ComStyles.itemImage,
            props.dimensions.window.width < 500
              ? MobStyles.itemImage
              : PcStyles.itemImage,
          ]}
        >
          <ImageLoad
            style={{ width: 100, height: 100 }}
            loadingStyle={{
              size: "large",
              color: "#aaa",
              width: 100,
              height: 100,
            }}
            placeholderSource={require("../../../../assets/loading_logo.png")}
            source={{
              uri:
                server +
                "/ProductImages/" +
                props.item.Category +
                "/" +
                props.item.SubCategory +
                "/" +
                props.item.ProductName +
                ".png",
            }}
          />
        </View>
      </View>
      <View>
        <Row>
          <Text
            style={{
              paddingHorizontal: 8,
              fontSize: 14,
              fontWeight: "700",
              color: "#777",
            }}
          >
            {props.item.Price}
          </Text>
          <Text
            style={{
              textDecorationLine: "line-through",
              fontSize: 10,
              fontWeight: "600",
              color: "#aaa",
              alignSelf: "flex-end",
            }}
          >
            {parseInt(props.item.Price) + 5}
          </Text>
        </Row>
        <Row>
          <Text
            style={{
              paddingHorizontal: 8,
              paddingTop: 2,
              fontSize: 12,
              fontWeight: "700",
              color: "#777",
              height: 30,
              borderWidth: 0,
            }}
          >
            {props.item.ProductName}
          </Text>
        </Row>
        <Row>
          <Text
            style={{
              paddingHorizontal: 8,
              paddingTop: 2,
              fontSize: 10,
              fontWeight: "600",
              color: "#777",
            }}
          >
            {props.item.Breakqty + " " + props.item.Unit}
          </Text>
        </Row>
      </View>
      <View style={{ paddingVertical: 6, paddingHorizontal: 10 }}>
        <QuantityView2 Quantity={quantity} Add={Add} Remove={Remove} />
      </View>
    </View>
  );
};

const ComStyles = StyleSheet.create({
  container: {
    width: 160,
    backgroundColor: "#fff",
    marginVertical: 10,
    marginHorizontal: 5,
    alignSelf: "center",
    borderWidth: 0,
    shadowColor: "#aaa",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 2,
  },
  itemImage: {
    height: 100,
    width: 100,
    borderWidth: 0,
    borderColor: "#0f0",
  },
});

const MobStyles = StyleSheet.create({
  container: {},
  itemImage: {},
});

const TabStyles = StyleSheet.create({
  container: {},
  itemImage: {},
});

const PcStyles = StyleSheet.create({
  container: {},
  itemImage: {},
});
