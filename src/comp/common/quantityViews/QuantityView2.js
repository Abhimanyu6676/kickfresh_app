import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {FontAwesome} from '@expo/vector-icons';

export default AddView = (props) => {
  const add = () => {
    props.Add();
  };
  const remove = () => {
    props.Remove();
  };

  if (props.Quantity) {
    return (
      <View style={styles.container}>
        <View style={styles.ItemAddView}>
          <View style={styles.RemoveButton}>
            <FontAwesome
              name="minus"
              style={[, {color: '#fff', fontSize: 14}]}
              onPress={remove}
            />
          </View>
          <View style={styles.centerText}>
            <Text style={styles.amountText}>{props.Quantity}</Text>
          </View>
          <View style={styles.AddButton}>
            <FontAwesome
              name="plus"
              style={[, {color: '#fff', fontSize: 14}]}
              onPress={add}
            />
          </View>
        </View>
      </View>
    );
  } else {
    return (
      <TouchableOpacity onPress={add}>
        <View style={styles.container}>
          <View
            style={{
              flex: 3.5,
              backgroundColor: '#af0',
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 3,
            }}>
            <Text style={{color: '#fff', fontSize: 18, fontWeight: 'bold'}}>
              ADD
            </Text>
          </View>
          <View
            style={{
              flex: 1.5,
              backgroundColor: '#0f9',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <FontAwesome
              name="plus"
              style={{
                color: '#fff',
                fontSize: 18,
              }}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    padding: 3,
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    borderRadius: 80,
    overflow: 'hidden',
  },
  itemImage: {
    height: '70%',
    borderWidth: 0,
    borderColor: '#0f0',
  },
  ItemAddView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
    borderColor: '#f00',
    paddingVertical: 2,
  },
  AddButton: {
    width: 22,
    height: 22,
    backgroundColor: '#0a0',
    padding: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0,
    borderRadius: 4,
  },
  RemoveButton: {
    width: 22,
    height: 22,
    backgroundColor: '#0a0',
    padding: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0,
    borderRadius: 4,
  },
  centerText: {
    flex: 0.8,
    justifyContent: 'center',
    alignContent: 'center',
    borderWidth: 0,
  },
  amountText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#aaa',
  },
  button: {
    backgroundColor: 'transparent',
  },
});
