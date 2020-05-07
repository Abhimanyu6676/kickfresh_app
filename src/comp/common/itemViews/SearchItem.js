import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {QuantityView1} from '../quantityViews/QuantityView1';
import {useSelector, useDispatch} from 'react-redux';
import {cartListAction} from '../../../redux/actions/CartListAction';
import {AddToCart, RemoveFromCart} from '../../../services/CartUpdate';

export default SearchItem = (props) => {
  const [quantity, setQuantity] = useState(0);
  const cart = useSelector((state) => state.cartReducer.cartList);
  const dispatch = useDispatch();

  useEffect(() => {
    //effect
    let productQty = 0;
    let itemArrary = cart.filter((item) => {
      item.ProductName == props.item.ProductName;
    });
    cart.map((item, index) => {
      if (item.ProductName == props.item.ProductName) {
        productQty = item.currQty ? item.currQty : 0;
      }
    });
    setQuantity(productQty);
    return () => {
      //cleanup
    };
  });

  const Add = async () => {
    let r = AddToCart({
      Product: props.item,
      Cart: cart,
      Qty: 1,
    });
    dispatch(cartListAction({cartList: r.cartList}));
  };

  const Remove = async () => {
    let r = RemoveFromCart({
      Cart: cart,
      Qty: 1,
      ProductName: props.item.ProductName,
    });
    dispatch(cartListAction({cartList: r.cartList}));
  };
  return (
    <View
      style={[
        ComStyles.container,
        props.dimensions.window.width < 500
          ? MobStyles.container
          : PcStyles.container,
      ]}>
      <View
        style={[
          ComStyles.ProductNameContainer,
          props.dimensions.window.width < 500
            ? MobStyles.ProductNameContainer
            : PcStyles.ProductNameContainer,
        ]}>
        <Text
          style={[
            ComStyles.ProductName,
            props.dimensions.window.width < 500
              ? MobStyles.ProductName
              : PcStyles.ProductName,
          ]}>
          {props.item.ProductName}
        </Text>
      </View>
      <View
        style={[
          ComStyles.QuantityContainer,
          props.dimensions.window.width < 500
            ? MobStyles.QuantityContainer
            : PcStyles.QuantityContainer,
        ]}>
        <Right style={{justifyContent: 'center', borderWidth: 0}}>
          <QuantityView1 qty={quantity} Add={Add} Remove={Remove} />
        </Right>
      </View>
    </View>
  );
};

import {StyleSheet} from 'react-native';
import {Right} from 'native-base';

const ComStyles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: '#aaa',
    height: 40,
    flexDirection: 'row',
  },
  ProductName: {
    paddingHorizontal: 20,
    color: '#aaa',
  },
  ProductNameContainer: {
    flex: 1,
    borderWidth: 0,
    justifyContent: 'center',
  },
  QuantityContainer: {
    flex: 0.7,
    borderWidth: 0,
    justifyContent: 'center',
  },
});

const MobStyles = StyleSheet.create({
  container: {},
  ProductName: {},
  ProductNameContainer: {},
  QuantityContainer: {},
});

const TabStyles = StyleSheet.create({
  container: {},
});

const PcStyles = StyleSheet.create({
  container: {},
  ProductName: {},
  ProductNameContainer: {},
  QuantityContainer: {},
});
