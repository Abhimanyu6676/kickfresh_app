import React from 'react';
import {View, Text} from 'react-native';
import CartItems from './CartItem';

export const CartList = () => {
  return (
    <View style={{margin: '0vw', borderWidth: 0}}>
      <Text style={{color: '#aaa', fontSize: 15, alignSelf: 'center'}}>
        You have 3 Items in your cart
      </Text>
      <CartItems />
    </View>
  );
};
