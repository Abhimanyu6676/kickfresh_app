import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import QuantityView2 from '../quantityViews/QuantityView2';
import {Row} from 'native-base';
import {connect} from 'react-redux';
import {cartListAction} from '../../../redux/actions/CartListAction';
import {useFocusEffect} from '@react-navigation/native';
import {AddToCart, RemoveFromCart} from '../../../services/CartUpdate';

const Itemtype1 = (props) => {
  const [quantity, setQuantity] = useState(0);

  useFocusEffect(() => {
    //console.log('focus');
    return () => {};
  });

  useEffect(() => {
    //Effect
    console.log('effect');
    let productQty = 0;
    props.cart.map((item, index) => {
      if (item.ProductName == props.item.ProductName) {
        productQty = item.currQty ? item.currQty : 0;
      }
    });
    setQuantity(productQty);
    return () => {
      //CleanUp
    };
  });

  const Add = () => {
    let r = AddToCart({
      Product: props.item,
      Cart: props.cart,
      Qty: 1,
    });
    //setQuantity(r.rtrQty ? r.rtrQty : 0);
    props.cartListAction({cartList: r.cartList});
  };

  const Remove = () => {
    let r = RemoveFromCart({
      Cart: props.cart,
      Qty: 1,
      ProductName: props.item.ProductName,
    });
    //setQuantity(r.rtrQty ? r.rtrQty : 0);
    props.cartListAction({cartList: r.cartList});
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 10,
        }}>
        <View
          style={{
            position: 'absolute',
            top: 2,
            alignSelf: 'flex-start',
            backgroundColor: '#0a0',
            borderRadius: 10,
            paddingHorizontal: 4,
            paddingVertical: 2,
            zIndex: 2,
          }}>
          <Text style={{fontSize: 10, fontWeight: '600', color: '#fff'}}>
            15% off
          </Text>
        </View>
        <View style={styles.itemImage}>
          <Image
            style={{width: 120, height: 80}}
            source={{
              uri:
                'http://localhost:3000/static/images/productImages/' +
                props.item.Category +
                '/' +
                props.item.SubCategory +
                '/' +
                props.item.ProductName +
                '.png',
            }}
          />
        </View>
      </View>
      <View>
        <Row>
          <Text
            style={{
              paddingHorizontal: 8,
              fontSize: 14,
              fontWeight: '700',
              color: '#777',
            }}>
            {props.item.Price}
          </Text>
          <Text
            style={{
              textDecorationLine: 'line-through',
              fontSize: 10,
              fontWeight: '600',
              color: '#aaa',
              alignSelf: 'flex-end',
            }}>
            {parseInt(props.item.Price) + 5}
          </Text>
        </Row>
        <Row>
          <Text
            style={{
              paddingHorizontal: 8,
              paddingTop: 2,
              fontSize: 12,
              fontWeight: '700',
              color: '#777',
              height: 30,
              borderWidth: 0,
            }}>
            {props.item.ProductName}
          </Text>
        </Row>
        <Row>
          <Text
            style={{
              paddingHorizontal: 8,
              paddingTop: 2,
              fontSize: 10,
              fontWeight: '600',
              color: '#777',
            }}>
            {props.item.Breakqty + ' ' + props.item.Unit}
          </Text>
        </Row>
      </View>
      <QuantityView2 Quantity={quantity} Add={Add} Remove={Remove} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 150,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
    marginVertical: 10,
    marginHorizontal: 5,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  itemImage: {
    height: 80,
    width: 120,
    borderWidth: 0,
    borderColor: '#0f0',
  },
});

//export default ItemType1;
export default ItemType1 = connect(
  (state) => ({
    cart: state.cartReducer.cartList,
  }),
  {cartListAction},
)(Itemtype1);
