import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';

/**
 *
 * @param {props - Price<cartPrice>, User<userObject>, resolveCart<cartResolver>}
 *  - props
 *    -- Price - cartPrice from cartScreen
 *    -- User - Redux User state object from cartScreen
 *    -- resolveCart - cartResolver() function lies in cartScreen
 *
 * @todo get Navigation prop from working stack
 * @todo navigate to terms and condition page upon press on TnC
 */
export const Checkout = (props) => {
  const [checkOutText, setCheckOutText] = useState('CHECKOUT');
  const {selectedAddress, User} = props;
  const {cartResolvedBoolean, cartResolutionTime} = useSelector(
    (state) => state.cartReducer,
  );

  useEffect(() => {
    //effect
    setCheckOutText(
      props.Price > 0 ? 'PROCEED TO CHECKOUT' : 'ADD ITEMS TO CART',
    );
    return () => {
      //cleanup
    };
  });

  const validateNcheckout = () => {
    if (!props.Price > 0) {
      alert('Cart is empty, Please add items to cart');
      return;
    }
    if (!User.username || User.username.includes('temp')) {
      alert('Please consider SignIN/LogIN prior ordering');
      return;
    }
    //console.log(selectedAddress);
    if (!selectedAddress.addLine1 || selectedAddress.addLine1.length < 2) {
      alert('Delivery Address is Required');
      return;
    }
    props.resolveCart();
  };
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
      <TouchableOpacity onPress={() => validateNcheckout()}>
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
            {props.resolverLoading
              ? 'LOADING ...'
              : !cartResolvedBoolean && props.cartHasChanges
              ? 'CONFIRM CHANGES'
              : checkOutText}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
