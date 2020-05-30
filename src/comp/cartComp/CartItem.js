import React, {useEffect, useState} from 'react';
import {Text, View, Animated, Easing} from 'react-native';
import {QuantityView1} from '../common/quantityViews/QuantityView1';
import {useSelector, useDispatch} from 'react-redux';
import {cartListAction} from '../../redux/actions/CartListAction';
import {AddToCart, RemoveFromCart} from '../../services/CartUpdate';
import ImageLoad from 'react-native-image-placeholder';
import {server2} from '../../services/REST';
import {Row} from '../../../assets/components/Layouts';
import {
  primaryColor,
  secondaryColor,
} from '../../../assets/theme/global_colors';

export default Cartitems = (props) => {
  const {cart} = props;
  const dispatch = useDispatch();

  return (
    <View style={{borderWidth: 0, alignItems: 'center'}}>
      {cart.map(
        (item, index) =>
          item.currQty && (
            <ListItem
              item={item}
              key={index}
              cart={cart}
              dispatch={dispatch}
              width={props.width}
            />
          ),
      )}
      {/* <View
        style={{
          height: 200,
          borderWidth: 0,
          width: '90%',
          backgroundColor: '#eeeeeeee',
          borderRadius: 10,
        }}>
        <Text>Unavailable Items</Text>
      </View> */}
    </View>
  );
};

const ListItem = (props) => {
  //const [fadeAnim] = useState(new Animated.Value(0));
  const [started, setStarted] = useState(false);

  const Add = async () => {
    let r = AddToCart({
      Product: props.item,
      Cart: props.cart,
      Qty: 1,
    });
    props.dispatch(cartListAction({cartList: r.cartList}));
  };

  const Remove = async () => {
    let r = RemoveFromCart({
      Cart: props.cart,
      Qty: 1,
      ProductName: props.item.ProductName,
    });
    props.dispatch(cartListAction({cartList: r.cartList}));
  };

  /* const startOpacity = () => {
    //opacity.setValue(0.5);
    if (!started) setStarted(true);
    console.log('animation started - ' + fadeAnim.__getValue());
    Animated.timing(fadeAnim, {
      toValue: fadeAnim.__getValue() > 0 ? 0 : 1,
      duration: 1000,
      easing: Easing.linear,
    }).start(() => {
      startOpacity();
    });
  };

  const _fadeAnim = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 1],
  });
  useEffect(() => {
    if (!started && props.item.modified) startOpacity();
    return () => {};
  }); */

  return (
    <View
      style={[
        ComStyles.Item,
        props.width < 500 ? MobStyles.Item : PcStyles.Item,
        {borderWidth: props.item.modified ? 1 : 0, borderColor: primaryColor},
        /* {opacity: props.item.modified ? _fadeAnim : 1}, */
      ]}>
      <View
        style={{
          alignSelf: 'flex-start',
        }}>
        <ImageLoad
          style={{width: 60, height: 60}}
          customImagePlaceholderDefaultStyle={{width: 60, height: 60}}
          loadingStyle={{
            size: 'small',
            color: '#aaa',
            borderWidth: 2,
          }}
          placeholderSource={require('../../../assets/loading_logo.png')}
          source={{
            uri:
              server2 +
              '/ProductImages/' +
              props.item.Category +
              '/' +
              props.item.SubCategory +
              '/' +
              props.item.ProductName +
              '.png',
          }}
        />
      </View>

      <View
        style={{
          borderWidth: 0,
          flex: 1,
          marginLeft: 20,
          justifyContent: 'center',
        }}>
        <Text style={{color: '#aaa', fontWeight: 'bold', fontSize: 16}}>
          {props.item.ProductName}
        </Text>
        <Text style={{color: '#aaa'}}>500gms</Text>
        <View style={{flexDirection: 'row'}}>
          {props.item.modified && (
            <Text
              style={{
                color: primaryColor,
                fontWeight: 'bold',
                marginTop: 5,
                marginRight: 5,
              }}>
              New Price
            </Text>
          )}
          <Text style={{color: primaryColor, fontWeight: 'bold', marginTop: 5}}>
            Rs {props.item.Price ? props.item.Price : '--'}
          </Text>
          {props.item.MRP > props.item.Price && (
            <Text
              style={{
                color: primaryColor,
                textDecorationLine: 'line-through',
                fontSize: 10,
                fontWeight: '600',
                color: '#aaa',
                alignSelf: 'flex-end',
                marginLeft: 10,
              }}>
              Rs {props.item.MRP}
            </Text>
          )}
        </View>
      </View>

      <View style={{borderWidth: 0, alignSelf: 'flex-end'}}>
        <QuantityView1 qty={props.item.currQty} Add={Add} Remove={Remove} />
      </View>
    </View>
  );
};

import {StyleSheet} from 'react-native';

const ComStyles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderWidth: 0,
  },
  Item: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginVertical: 8,
    marginHorizontal: 10,
    borderWidth: 0,
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 8,
    shadowColor: '#aaa',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 2,
  },
});

const MobStyles = StyleSheet.create({
  container: {},
  Item: {width: '90%'},
});

const TabStyles = StyleSheet.create({
  container: {},
  Item: {},
});

const PcStyles = StyleSheet.create({
  container: {},
  Item: {width: '90%'},
});
