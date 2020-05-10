import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import CartItems from './CartItem';
import {connect} from 'react-redux';

const Cartlist = (props) => {
  return (
    <View
      style={[
        ComStyles.CartListContainer,
        props.dimensions.window.width < 500
          ? MobStyles.CartListContainer
          : PcStyles.CartListContainer,
      ]}>
      <Text style={{color: '#aaa', fontSize: 15, alignSelf: 'center'}}>
        You have {props.cart.length ? props.cart.length : 0} Items in your cart
      </Text>
      <CartItems dimensions={props.dimensions} />
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
  },
});

const MobStyles = StyleSheet.create({
  CartListContainer: {
    width: '90%',
  },
});

const TabStyles = StyleSheet.create({
  CartListContainer: {},
});

const PcStyles = StyleSheet.create({
  CartListContainer: {
    width: '80%',
  },
});

export default CartList = connect((state) => ({
  cart: state.cartReducer.cartList,
}))(Cartlist);
