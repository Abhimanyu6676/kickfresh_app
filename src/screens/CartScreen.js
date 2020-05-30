import React, {useEffect, useState, useRef} from 'react';
import {View, Text, Dimensions} from 'react-native';
import {MobileLoginBlock} from '../comp/cartComp/MobileLoginBlock';
import CartList from '../comp/cartComp/CartList';
import {connect, useSelector, useDispatch} from 'react-redux';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import CartInfo from '../comp/cartComp/CartInfo';
import {primaryColor} from '../../assets/theme/global_colors';
import {resolveCartAPI} from '../services/REST';
import * as WebBrowser from 'expo-web-browser';
import {Linking} from 'expo';
import {Ionicons} from '@expo/vector-icons';

const window = Dimensions.get('window');
const screen = Dimensions.get('screen');

/**
 * standalone component
 *
 * @param {* navigation, route} props
 */
const Cartscreen = (props) => {
  const {navigation, route} = props;
  const dispatch = useDispatch();
  const [saving, setSaving] = useState(0);
  const [priceTotal, setPriceTotal] = useState(0);
  const [dimensions, setDimensions] = useState({window, screen});
  const [parentWidth, setParentWidth] = useState(0);
  const User = useSelector((state) => state.userReducer.User);
  const [resolverLoading, setResolverLoading] = useState(false);
  const [showPaymentSection, setShowPaymentSection] = useState(false);
  const [cartHasChanges, setCartHasChanges] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showNoService, setShowNoService] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState({});
  const {currentLocation, currentRegion} = useSelector(
    (state) => state.globalReducer,
  );

  const updateSelectedAddress = (props) => {
    console.log('Setting Selected Address' + JSON.stringify(props));
    setSelectedAddress(props);
  };

  const onDimensionChange = ({window, screen}) => {
    setDimensions({window, screen});
  };

  useEffect(() => {
    let P = 0,
      saving = 0;
    props.cart.map((item, index) => {
      P += item.currQty * item.Price;
      //console.log('--' + JSON.stringify(item));
      saving += item.currQty * (item.MRP - item.Price);
    });
    setPriceTotal(P);
    setSaving(saving);
    console.log('Locations >> ' + currentLocation + ' >> ' + currentRegion);
    Dimensions.addEventListener('change', onDimensionChange);
    return () => {
      Dimensions.removeEventListener('change', onDimensionChange);
    };
  });

  const resolveCart = () => {
    setResolverLoading(true);
    const debug = false;
    {
      debug && console.log('execute order');
    }
    const temp = [];
    props.cart.map((item, index) => {
      let t1 = {};
      t1.id = item.id;
      t1.ProductName = item.ProductName;
      t1.ProductID = item.ProductID;
      t1.Price = item.Price;
      t1.MRP = item.MRP;
      t1.orderQty = item.currQty;
      //t1.error = '';
      temp.push(t1);
    });
    console.log({products: temp, userID: User.id});
    resolveCartAPI({products: temp, userID: User.id, addID: selectedAddress.id})
      .then((result) => {
        {
          debug && console.log('cart resolver result arrirved');
        }
        if (result.data.data.cartResolver.success) {
          switch (result.data.data.cartResolver.success) {
            case 'NO_SERVICE':
              console.log('no service available in your area');
              setShowNoService(true);
              break;

            case 'NO_PRODUCT':
              console.log('no products in cart');
              break;

            case 'NOT_RESOLVED':
              console.log('Cart modifications');
              /*   {
                  debug &&
                    console.log('Resolver arrived with NO success Updating cart Now');
                }
                const newCart = [];
                result.data.data.cartResolver.Products.map((item, index) => {
                  if (item.modified) {
                    props.cart.map((cartItem, cartItemIndex) => {
                      if (cartItem.ProductID == item.ProductID) {
                        let P = cartItem;
                        P.Price = item.Price;
                        P.modified = item.modified;
                        {
                          debug &&
                            console.log(
                              'product ' + P.ProductName + ' has been-modified',
                            );
                        }
                        newCart.push(P);
                      }
                    });
                  } else {
                    props.cart.map((cartItem, cartItemIndex) => {
                      if (cartItem.ProductID == item.ProductID) {
                        let P = cartItem;
                        P.modified = false;
                        newCart.push(cartItem);
                        return;
                      }
                    });
                  }
                });
                {
                  debug &&
                    console.log(
                      'new CartList after Modification' + JSON.stringify(newCart),
                    );
                }
                {
                  debug && console.log('Now dispatching cart to store');
                }
                dispatch(cartResolvedBooleanAction({cartResolvedBoolean: false}));
                dispatch(cartListAction({cartList: newCart}));
                setCartHasChanges(true);
                alert(
                  'Your cart has some Price changes, this might be because of location selection\nPlease Confirm changes to proceed\n\nYou are seeing this as your cart has some modification',
                ); */
              break;

            case 'RESOLVED':
              console.log('cart resolved');
              /*   //-->no changes in the cart and resolved successfully, remove perviously modified flag from item
              //-->proceed to post order
              const newCart = [];
              props.cart.map((cartItem, cartItemIndex) => {
                let P = cartItem;
                P.modified = false;
                newCart.push(cartItem);
                return;
              });
              dispatch(cartResolvedBooleanAction({cartResolvedBoolean: true}));
              dispatch(cartListAction({cartList: newCart}));
              setCartHasChanges(false);
              proceedPayment(); */
              break;
          }
        } else {
          alert(
            "Unexpected Error occured, please try later\n\nYou can try our what'sapp Platform to place order, \nSimply take the screenshot of your cart and send us on 9582463222",
          );
        }
        setResolverLoading(false);
      })
      .catch((error) => {
        {
          console.log('cart resolver error' + JSON.stringify(error));
        }
        {
          debug && console.log(error);
        }
        console.log(error);
        setResolverLoading(false);
        alert(
          "Unexpected Error occured, please try later\n\nYou can try our what'sapp Platform to place order, \nSimply take the screenshot of your cart and send us on 9582463222",
        );
      });
  };

  const proceedPayment = () => {
    const debug = true;
    {
      debug && console.log('payment proceed');
    }
    /*  console.log('linking Url = ' + Linking.makeUrl('freshkick', {kry: 'key'})); */
    dispatch(cartResolutionTimeAction({cartResolutionTime: 1111}));
    //return new Promise((resolve, reject) => {});
    openAuthSession();
    //setShowPayment(true);
  };

  const openAuthSession = async () => {
    try {
      let result = await WebBrowser.openAuthSessionAsync(
        'http://192.168.1.6:3000/backend/payment/getOrder?amount=' +
          priceTotal * 100 +
          '&redirectUri=' +
          Linking.makeUrl('/?'),
        Linking.makeUrl('/?'),
      );
      let redirectData;
      if (result) console.log('redirect URL > ' + JSON.stringify(result));
      console.log('----------');
    } catch (error) {
      console.log('error opening auth session > ' + error);
    }
  };

  if (!showPayment && !showNoService)
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
            <CartList width={parentWidth} cart={props.cart} />
          </View>
          <View
            style={[
              ComStyles.cartInfo,
              parentWidth <= 500 ? MobStyles.cartInfo : PcStyles.cartInfo,
            ]}>
            <CartInfo
              dimensions={dimensions}
              User={User}
              resolveCart={resolveCart}
              resolverLoading={resolverLoading}
              cartHasChanges={cartHasChanges}
              selectedAddress={selectedAddress}
              updateSelectedAddress={updateSelectedAddress}
            />
          </View>
        </View>
      </ScrollView>
    );
  else if (showNoService)
    return (
      <View
        style={{
          height: '100%',
          width: '100%',
        }}>
        <View
          style={{
            height: '50%',
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 50,
          }}>
          <Text
            style={{
              color: primaryColor,
              fontSize: 30,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            Service Unavailable{'\n\n'}
            <Text style={{fontWeight: 'normal', fontSize: 20}}>
              We are currently not accepting orders in your area, due to service
              denial by local authorites{'\n'}
            </Text>
            <Text style={{fontWeight: 'normal', fontSize: 20}}>
              All delivery services are expected to be resumed by 7th June, we
              will notify you for any updates
            </Text>
          </Text>
        </View>
        <TouchableOpacity
          style={{alignItems: 'center'}}
          onPress={() => {
            setShowNoService(false);
          }}>
          <Ionicons
            name="ios-close-circle-outline"
            style={{fontSize: 45, padding: 20, color: primaryColor}}
          />
        </TouchableOpacity>
      </View>
    );
  else if (showPayment)
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            setShowPayment(false);
          }}>
          <Text>Payment Waiting</Text>
        </TouchableOpacity>
      </View>
    );
};

export default CartScreen = connect((state) => ({
  cart: state.cartReducer.cartList,
  cartResolutionTime: state.cartReducer.cartResolutionTime,
}))(Cartscreen);

import {StyleSheet} from 'react-native';
import {
  cartListAction,
  cartResolutionTimeAction,
  cartResolvedBooleanAction,
} from '../redux/actions/CartListAction';

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
