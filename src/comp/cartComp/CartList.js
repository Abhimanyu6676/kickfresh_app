import React, {useState, useEffect} from 'react';
import {View, Text, Image} from 'react-native';
import CartItems from './CartItem';
import {connect} from 'react-redux';
import {FontAwesome5} from '@expo/vector-icons';

const Cartlist = (props) => {
  return (
    <View
      style={[
        ComStyles.CartListContainer,
        props.width <= 500
          ? MobStyles.CartListContainer
          : PcStyles.CartListContainer,
      ]}>
      <Text style={{color: '#aaa', fontSize: 15, alignSelf: 'center'}}>
        You have {props.cart.length ? props.cart.length : 0} Items in your cart
      </Text>
      {props.cart.length == 0 && (
        <View
          style={{
            borderWidth: 0,
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            width: '100%',
          }}>
          <FontAwesome5
            name="shopping-cart"
            style={{color: '#d3d3d3', fontSize: 70}}
          />
          <Text
            style={{
              color: '#d3d3d3',
              fontSize: 20,
              marginTop: 10,
              fontWeight: 'bold',
            }}>
            CART EMPTY
          </Text>
        </View>
      )}
      <CartItems width={props.width} />
    </View>
  );
};

import {StyleSheet} from 'react-native';

const ComStyles = StyleSheet.create({
  CartListContainer: {
    backgroundColor: '#fff',
    borderWidth: 0,
    alignSelf: 'center',
    borderRadius: 10,
    minHeight: 300,
    paddingBottom: 20,
  },
});

const MobStyles = StyleSheet.create({
  CartListContainer: {
    width: '100%',
  },
});

const TabStyles = StyleSheet.create({
  CartListContainer: {},
});

const PcStyles = StyleSheet.create({
  CartListContainer: {
    width: '100%',
  },
});

export default CartList = connect((state) => ({
  cart: state.cartReducer.cartList,
}))(Cartlist);
