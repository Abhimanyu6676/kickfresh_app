import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Icon, Button } from "native-base";
import { FontAwesome } from "@expo/vector-icons";

const AddView = props => {
  const [quantity, setQuantity] = useState(0);

  const add = () => {
    setQuantity(quantity + 1);
  };
  const remove = () => {
    if (quantity > 0) setQuantity(quantity - 1);
  };

  return (
    <View style={styles.ItemAddView}>
      <View style={styles.RemoveButton}>
        <FontAwesome
          name="minus"
          style={[, { color: "#aaa" }]}
          onPress={remove}
        />
      </View>
      <View style={styles.centerText}>
        <Text style={styles.amountText}>{quantity}</Text>
      </View>
      <View style={styles.AddButton}>
        <FontAwesome
          name="plus"
          style={[, { color: "#aaa" }]}
          onPress={remove}
        />
      </View>
    </View>
  );
};

const ItemType1 = props => {
  return (
    <View style={styles.container}>
      <View style={styles.itemImage}></View>
      <AddView />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 150,
    width: 150,
    borderRadius: 10,
    borderWidth: 1,
    marginVertical: 10,
    marginHorizontal: 5,
    overflow: "hidden"
  },
  itemImage: {
    height: "70%",
    borderWidth: 1,
    borderColor: "#0f0"
  },
  ItemAddView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0,
    borderColor: "#f00"
  },
  AddButton: {
    flex: 1,
    alignItems: "center",
    borderWidth: 0
  },
  RemoveButton: {
    flex: 1,
    alignItems: "center",
    borderWidth: 0
  },
  centerText: {
    flex: 0.6,
    justifyContent: "center",
    alignContent: "center",
    borderWidth: 0
  },
  amountText: { fontSize: 20, fontWeight: "bold", textAlign: "center" },
  button: {
    backgroundColor: "transparent"
  }
});
export default ItemType1;
