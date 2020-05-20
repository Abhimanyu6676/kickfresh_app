import React, {useEffect, useState, useRef} from 'react';
import {View, Text, Dimensions} from 'react-native';
import {MobileLoginBlock} from '../comp/cartComp/MobileLoginBlock';
import CartList from '../comp/cartComp/CartList';
import axios from 'axios';
import {connect, useSelector} from 'react-redux';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import CartInfo from '../comp/cartComp/CartInfo';

const window = Dimensions.get('window');
const screen = Dimensions.get('screen');

const Cartscreen = (props) => {
  const {navigation, route} = props;
  const [saving, setSaving] = useState(0);
  const [dimensions, setDimensions] = useState({window, screen});
  const [parentWidth, setParentWidth] = useState(0);

  const onDimensionChange = ({window, screen}) => {
    setDimensions({window, screen});
  };

  useEffect(() => {
    //effect
    console.log('--------------------');
    console.log(route);
    let P = 0,
      saving = 0;
    props.cart.map((item, index) => {
      P += item.currQty * item.Price;
      console.log('--' + JSON.stringify(item));
      saving += item.currQty * (item.MRP - item.Price);
    });
    setSaving(saving);
    Dimensions.addEventListener('change', onDimensionChange);
    return () => {
      //cleanup
      Dimensions.removeEventListener('change', onDimensionChange);
    };
  });

  return (
    <ScrollView style={{height: '100%'}}>
      <View
        style={ComStyles.container}
        onLayout={(event) => {
          setParentWidth(event.nativeEvent.layout.width);
        }}>
        {props.cart.length > 0 && (
          <View
            style={[
              ComStyles.SaveBlock,
              parentWidth <= 500 ? MobStyles.SaveBlock : PcStyles.SaveBlock,
            ]}>
            <Text
              style={{
                color: '#fff',
                fontSize: 18,
                fontWeight: 'bold',
                marginLeft: 10,
              }}>
              Total Saving on Cart
            </Text>
            <Text
              style={{
                color: '#fff',
                fontSize: 18,
                fontWeight: 'bold',
                marginRight: 10,
                paddingLeft: 20,
                borderLeftColor: '#fff',
                borderLeftWidth: 1,
              }}>
              Rs {saving}
            </Text>
          </View>
        )}
        {/* <MobileLoginBlock dimensions={dimensions} /> */}
        <View
          style={[
            ComStyles.cartList,
            parentWidth <= 500 ? MobStyles.cartList : PcStyles.cartList,
          ]}>
          <CartList width={parentWidth} />
        </View>
        <View
          style={[
            ComStyles.cartInfo,
            parentWidth <= 500 ? MobStyles.cartInfo : PcStyles.cartInfo,
          ]}>
          <CartInfo dimensions={dimensions} User={props.User} />
        </View>
      </View>
    </ScrollView>
  );
};

export default CartScreen = connect((state) => ({
  cart: state.cartReducer.cartList,
}))(Cartscreen);

import {StyleSheet} from 'react-native';
import {primaryColor} from '../../assets/theme/global_colors';
import {getForCartDialog} from '../services/HelperFunctions';

const ComStyles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#eee',
    alignItems: 'center',
    borderWidth: 0,
  },
  cartInfo: {
    backgroundColor: '#fff',
    borderWidth: 0,
    marginVertical: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  SaveBlock: {
    marginTop: 20,
    height: 40,
    backgroundColor: primaryColor,
    borderRadius: 5,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartList: {marginTop: 20, width: '100%'},
});

const MobStyles = StyleSheet.create({
  cartInfo: {width: '95%'},
  SaveBlock: {width: '95%'},
  cartList: {width: '95%'},
});

const TabStyles = StyleSheet.create({
  cartInfo: {},
  cartList: {},
  SaveBlock: {},
});

const PcStyles = StyleSheet.create({
  cartInfo: {width: '80%'},
  SaveBlock: {width: '80%'},
  cartList: {width: '80%'},
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
