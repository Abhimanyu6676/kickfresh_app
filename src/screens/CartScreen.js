import React, {useEffect, useState} from 'react';
import {View, Text, Dimensions} from 'react-native';
import {MobileLoginBlock} from '../comp/cartComp/MobileLoginBlock';
import CartList from '../comp/cartComp/CartList';
import axios from 'axios';
import {connect} from 'react-redux';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import CartInfo from '../comp/cartComp/CartInfo';

const window = Dimensions.get('window');
const screen = Dimensions.get('screen');

const Cartscreen = (props) => {
  const {navigation, route} = props;
  const [Price, setPrice] = useState(0);
  const [dimensions, setDimensions] = useState({window, screen});

  const onDimensionChange = ({window, screen}) => {
    setDimensions({window, screen});
  };

  useEffect(() => {
    //effect
    let P = 0;
    props.cart.map((item, index) => {
      P = item.currQty * item.Price + P;
    });
    setPrice(P);
    Dimensions.addEventListener('change', onDimensionChange);
    return () => {
      //cleanup
      Dimensions.removeEventListener('change', onDimensionChange);
    };
  });

  return (
    <ScrollView style={{height: '100%'}}>
      <View style={ComStyles.container}>
        <MobileLoginBlock dimensions={dimensions} />
        <CartList dimensions={dimensions} />
        <View
          style={[
            ComStyles.cartInfo,
            dimensions.window.width < 500
              ? MobStyles.cartInfo
              : PcStyles.cartInfo,
          ]}>
          <CartInfo dimensions={dimensions} />
        </View>
      </View>
    </ScrollView>
  );
};

export default CartScreen = connect((state) => ({
  cart: state.cartReducer.cartList,
}))(Cartscreen);

import {StyleSheet} from 'react-native';

const ComStyles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#eee',
    alignItems: 'center',
  },
  cartInfo: {
    backgroundColor: '#fff',
    borderWidth: 0,
    marginVertical: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
});

const MobStyles = StyleSheet.create({
  cartInfo: {width: '90%'},
});

const TabStyles = StyleSheet.create({
  cartInfo: {},
});

const PcStyles = StyleSheet.create({
  cartInfo: {width: '80%'},
});

/* const getAllProducts = async () => {
  return new Promise(async (resolve, reject) => {
    await axios
      .get(
        'http://localhost:3000/',
        {},
        {
          timeout: 2000,
        },
      )
      .then((response) => {
        console.log(
          'axios response-- ' +
            'LoginAPI_status::' +
            response.status +
            'LoginAPI_body::' +
            response.data,
        );
        resolve(response);
        //cbRes("pass")
      })
      .catch((error) => {
        console.log('axios error:', error);
        reject(error);
      });
  });
}; */
