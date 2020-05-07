import React, {useEffect, useState} from 'react';
import {View, Text, Dimensions} from 'react-native';
import {Row, Container, Thumbnail, Button} from 'native-base';
import {MobileLoginBlock} from '../comp/cartComp/MobileLoginBlock';
import CartList from '../comp/cartComp/CartList';
import axios from 'axios';
import useAxios from 'axios-hooks';
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
    <ScrollView style={{backgroundColor: '#eee'}}>
      <MobileLoginBlock dimensions={dimensions} />
      <CartList dimensions={dimensions} />
      <CartInfo dimensions={dimensions} />
    </ScrollView>
  );
};

export default CartScreen = connect((state) => ({
  cart: state.cartReducer.cartList,
}))(Cartscreen);

const getAllProducts = async () => {
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
};
