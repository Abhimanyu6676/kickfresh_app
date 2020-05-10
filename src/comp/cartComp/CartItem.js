import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {QuantityView1} from '../common/quantityViews/QuantityView1';
import {useSelector, useDispatch} from 'react-redux';
import {cartListAction} from '../../redux/actions/CartListAction';
import {AddToCart, RemoveFromCart} from '../../services/CartUpdate';
import ImageLoad from 'react-native-image-placeholder';
import {server} from '../../services/REST';
import {Row} from '../../../assets/components/Layouts';

export default Cartitems = (props) => {
  const cart = useSelector((state) => state.cartReducer.cartList);
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
              dimensions={props.dimensions}
            />
          ),
      )}
    </View>
  );
};

const ListItem = (props) => {
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
  return (
    <Row
      _style={[
        ComStyles.Item,
        props.dimensions.window.width < 500 ? MobStyles.Item : PcStyles.Item,
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
              server +
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
        <Text style={{color: '#0a0', fontWeight: 'bold', marginTop: 5}}>
          Rs 32
        </Text>
      </View>

      <View style={{borderWidth: 0, alignSelf: 'flex-end'}}>
        <QuantityView1 qty={props.item.currQty} Add={Add} Remove={Remove} />
      </View>
    </Row>
  );
};

import {StyleSheet} from 'react-native';

const ComStyles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderWidth: 0,
  },
  Item: {
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
  Item: {width: '95%'},
});

const TabStyles = StyleSheet.create({
  container: {},
  Item: {},
});

const PcStyles = StyleSheet.create({
  container: {},
  Item: {width: '90%'},
});
