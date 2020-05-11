import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {FontAwesome} from '@expo/vector-icons';
import {
  primaryColor,
  secondaryColor,
} from '../../../../assets/theme/global_colors';

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
          <TouchableOpacity style={styles.RemoveButton} onPress={remove}>
            <FontAwesome
              name="minus"
              style={[, {color: primaryColor, fontSize: 14}]}
            />
          </TouchableOpacity>
          <View style={styles.centerText}>
            <Text style={styles.amountText}>{props.Quantity}</Text>
          </View>
          <TouchableOpacity style={styles.AddButton} onPress={add}>
            <FontAwesome
              name="plus"
              style={[, {color: primaryColor, fontSize: 14}]}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  } else {
    return (
      <TouchableOpacity style={{height: 30}} onPress={add}>
        <View style={styles.container}>
          <View
            style={{
              flex: 3.5,
              backgroundColor: '#af0',
              alignItems: 'center',
              justifyContent: 'center',
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
    height: 30,
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    overflow: 'hidden',
    borderRadius: 5,
  },
  ItemAddView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
    borderColor: '#f00',
  },
  AddButton: {
    width: 30,
    height: 30,
    backgroundColor: secondaryColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0,
    borderRadius: 4,
  },
  RemoveButton: {
    width: 30,
    height: 30,
    backgroundColor: secondaryColor,
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
