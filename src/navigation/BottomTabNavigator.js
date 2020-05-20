import React, {useEffect, useState, useRef, createRef} from 'react';
import {View, Text, TouchableOpacity, Dimensions, Platform} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TabBarIcon from '../../components/TabBarIcon';
import StoreNavigation from './StoreNavigation';
import {connect, useSelector, useDispatch} from 'react-redux';
import CartScreen from '../screens/CartScreen';
import {FontAwesome5, FontAwesome, EvilIcons} from '@expo/vector-icons';
import {primaryColor} from '../../assets/theme/global_colors';
import {Row, Col} from '../../assets/components/Layouts';
import {
  showLocationDialogAction,
  cartasDialogAction,
} from '../redux/actions/GlobalAction';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'StoreNavigation';
//const INITIAL_ROUTE_NAME = 'Cart';

const window = Dimensions.get('window');
const screen = Dimensions.get('screen');

const bottomTabNavigator = (props) => {
  const {navigation, route} = props;
  const [dimensions, setDimensions] = useState({window, screen});
  const {showLocationDialog, showCartasDialog, currentLocation} = useSelector(
    (state) => state.globalReducer,
  );
  const dispatch = useDispatch();
  const locationRef = useRef(null);

  const onDimensionChange = ({window, screen}) => {
    setDimensions({window, screen});
  };

  useEffect(() => {
    Dimensions.addEventListener('change', onDimensionChange);
    return () => {
      Dimensions.removeEventListener('change', onDimensionChange);
    };
  });

  navigation.setOptions({
    headerStyle: [
      ComStyles.headerStyle,
      dimensions.window.width < 500
        ? MobStyles.headerStyle
        : PcStyles.headerStyle,
    ],
    headerTitle: (props) => {
      <View></View>;
    },
    headerLeft: (props) => (
      <View
        style={{
          borderWidth: 0,
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: 30,
        }}>
        {getHeaderTitle(route) == 'Cart' && (
          <TouchableOpacity
            style={{
              paddingRight: 20,
              paddingLeft: 10,
              borderWidth: 0,
              height: '100%',
              justifyContent: 'center',
            }}
            onPress={() => {
              navigation.navigate('StoreNavigation');
            }}>
            <FontAwesome5
              style={{
                color: '#fff',
                fontSize: 22,
              }}
              name="arrow-left"
            />
          </TouchableOpacity>
        )}
        <View
          style={[
            ComStyles.headerTitle,
            dimensions.window.width < 500
              ? MobStyles.headerTitle
              : PcStyles.headerTitle,
          ]}>
          <Row>
            <Text
              style={[
                ComStyles.title,
                dimensions.window.width < 500
                  ? MobStyles.title
                  : PcStyles.title,
              ]}>
              {getHeaderTitle(route)}
            </Text>
          </Row>
          <Row>
            <Text style={{color: '#fff'}}>Store to Your Door</Text>
          </Row>
        </View>
      </View>
    ),
    headerRight: () => (
      <View
        style={[
          ComStyles.headerRight,
          dimensions.window.width < 500
            ? MobStyles.headerRight
            : PcStyles.headerRight,
        ]}>
        <Row
          _style={[
            ComStyles.headerRowOne,
            dimensions.window.width < 500
              ? MobStyles.headerRowOne
              : PcStyles.headerRowOne,
          ]}>
          {/*//Sec: 'location' */}

          {getHeaderTitle(route) != 'Cart' && (
            <TouchableOpacity
              onPress={() => {
                console.log('LOCATION');
                //if (!showLocationDialog)
                if (
                  Platform.OS == 'web' &&
                  locationRef != null &&
                  !showLocationDialog
                ) {
                  locationRef.current.scrollTo({x: 0, y: 0, animated: true});
                }
                if (showCartasDialog)
                  dispatch(cartasDialogAction({showCartasDialog: false}));
                dispatch(
                  showLocationDialogAction({
                    showLocationDialog: !showLocationDialog,
                  }),
                );
              }}
              style={{
                alignItems: 'center',
                paddingHorizontal: 10,
                flexDirection: 'row',
              }}>
              <Col _style={{alignItems: 'center'}}>
                {!currentLocation && (
                  <Text style={{color: '#fff'}}>Select</Text>
                )}
                {!currentLocation && (
                  <Text style={{color: '#fff'}}>Location</Text>
                )}
                {currentLocation && (
                  <Text style={{color: '#fff'}}>{currentLocation}</Text>
                )}
              </Col>
              <EvilIcons
                name="location"
                style={{fontSize: 25, color: '#fff'}}
              />
            </TouchableOpacity>
          )}

          {/*//Sec: 'User' */}
          <TouchableOpacity
            onPress={() => {
              console.log('USERSCREEN');
              props.navigation.navigate('UserProfile');
            }}
            style={{
              alignItems: 'center',
              paddingHorizontal: 10,
              flexDirection: 'row',
            }}>
            <FontAwesome
              name="user-circle"
              style={{fontSize: 25, color: '#fff'}}
            />
          </TouchableOpacity>
          {/*//Sec: 'Cart' */}
          <TouchableOpacity
            transparent
            onPress={() => {
              if (showLocationDialog)
                dispatch(
                  showLocationDialogAction({
                    showLocationDialog: false,
                  }),
                );
              console.log('===' + JSON.stringify(showCartasDialog));
              dispatch(
                cartasDialogAction({showCartasDialog: !showCartasDialog}),
              );
              if (!getForCartDialog(dimensions.window.width)) {
                navigation.navigate('Cart');
              } else {
                if (locationRef != null && !showCartasDialog)
                  locationRef.current.scrollTo({x: 0, y: 0, animated: true});
              }
            }}>
            <View
              style={{
                justifyContent: 'center',
                paddingHorizontal: 10,
                borderWidth: 0,
              }}>
              <View
                style={{
                  backgroundColor: '#fff',
                  paddingHorizontal: 2,
                  paddingVertical: 1,
                  borderRadius: 10,
                  position: 'absolute',
                  top: -12,
                  right: 0,
                  height: props.cart.length > 9 ? 20 : 15,
                  width: props.cart.length > 9 ? 20 : 15,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    color: '#0a0',
                  }}>
                  {props.cart.length ? props.cart.length : 0}
                </Text>
              </View>
              <FontAwesome5
                style={{
                  color: '#fff',
                  fontSize: 22,
                }}
                name="cart-arrow-down"
              />
            </View>
          </TouchableOpacity>
        </Row>
      </View>
    ),
  });

  return (
    <BottomTab.Navigator
      initialRouteName={INITIAL_ROUTE_NAME}
      tabBarOptions={{
        showLabel: false,
        style: {},
      }}>
      <BottomTab.Screen
        name="StoreNavigation"
        initialParams={{ref: locationRef}}
        component={StoreNavigation}
        options={{
          title: '',
          tabBarVisible: getForCartDialog(dimensions.window.width)
            ? false
            : true,
          tabBarIcon: ({focused}) => (
            <TabBarIcon focused={focused} name="store-alt" title="Store" />
          ),
        }}
      />
      {/* <BottomTab.Screen
        name="Subscriptions"
        component={LinksScreen}
        options={{
          title: '',
          tabBarIcon: ({focused}) => (
            <TabBarIcon
              focused={focused}
              name="md-book"
              title="Subscriptions"
            />
          ),
        }}
      /> */}
      <BottomTab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          title: '',
          tabBarVisible: getForCartDialog(dimensions.window.width)
            ? false
            : true,
          tabBarIcon: ({focused}) => (
            <TabBarIcon focused={focused} name="cart-arrow-down" title="Cart" />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

function getHeaderTitle(route) {
  const routeName =
    route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Cart':
      return 'Cart';
    case 'StoreNavigation':
      return 'FreshKick';
  }
}

import {StyleSheet} from 'react-native';
import {getForCartDialog} from '../services/HelperFunctions';

const ComStyles = StyleSheet.create({
  headerStyle: {
    backgroundColor: primaryColor,
  },
  headerTitle: {paddingRight: 5, borderWidth: 0},
  title: {fontWeight: 'bold', fontSize: 20, color: '#fff'},
  headerRight: {
    borderWidth: 0,
    paddingRight: 20,
  },
  headerRowOne: {
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const MobStyles = StyleSheet.create({
  headerStyle: {},
  headerTitle: {},
  title: {marginTop: 1},
  headerRight: {},
  headerRowOne: {marginTop: 1},
});

const TabStyles = StyleSheet.create({
  headerStyle: {},
  title: {},
  headerRight: {},
  headerRowOne: {},
});

const PcStyles = StyleSheet.create({
  headerStyle: {},
  title: {},
  headerRight: {},
  headerRowOne: {},
});

export default BottomTabNavigator = connect((state) => ({
  cart: state.cartReducer.cartList,
}))(bottomTabNavigator);
