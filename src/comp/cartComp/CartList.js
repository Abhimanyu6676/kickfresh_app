import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import CartItems from './CartItem';
import {connect} from 'react-redux';

const Cartlist = (props) => {
  return (
    <View style={{margin: '0vw', borderWidth: 0}}>
      <Text style={{color: '#aaa', fontSize: 15, alignSelf: 'center'}}>
        You have {props.cart.length ? props.cart.length : 0} Items in your cart
      </Text>
      <CartItems />
    </View>
  );
};

export default CartList = connect((state) => ({
  cart: state.cartReducer.cartList,
}))(Cartlist);
