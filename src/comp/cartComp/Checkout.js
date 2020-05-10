import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';

export const Checkout = (props) => {
  const [checkOutText, setCheckOutText] = useState('CHECKOUT');

  useEffect(() => {
    //effect
    setCheckOutText(
      props.Price > 0 ? 'PROCEED TO CHECKOUT' : 'ADD ITEMS TO CART',
    );
    return () => {
      //cleanup
    };
  });
  return (
    <View>
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
            height: 5,
          },
          shadowOpacity: 0.34,
          shadowRadius: 6.27,
          elevation: 4,
        }}>
        <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 20}}>
          {checkOutText}
        </Text>
      </View>
    </View>
  );
};
