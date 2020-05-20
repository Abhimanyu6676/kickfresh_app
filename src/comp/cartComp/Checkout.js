import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

export const Checkout = (props) => {
  const [checkOutText, setCheckOutText] = useState('CHECKOUT');
  const {selectedAddress} = props;

  useEffect(() => {
    //effect
    setCheckOutText(
      props.Price > 0 ? 'PROCEED TO CHECKOUT' : 'ADD ITEMS TO CART',
    );
    return () => {
      //cleanup
    };
  });

  const _checkOut = () => {
    if (!props.Price > 0) alert('Cart is empty, Please add items to cart');
    console.log('--------------------');
    console.log(selectedAddress);
    if (!selectedAddress.addLine1 || selectedAddress.addLine1.length < 2)
      alert('Delivery Address is Required');
  };
  return (
    <View>
      <TouchableOpacity onPress={() => _checkOut()}>
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 10,
          }}>
          <Text style={{color: '#aaa', fontWeight: '500'}}>
            I accept the Terms and Conditions prior Ordering
          </Text>
        </View>
        <View
          style={{
            width: '100%',
            height: 35,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0a0',
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 0.34,
            shadowRadius: 6.27,
            elevation: 4,
          }}>
          <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 20}}>
            {checkOutText}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
