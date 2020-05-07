import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TabBarIcon from '../../components/TabBarIcon';
import LinksScreen from '../screens/LinksScreen';
import {Button, Icon, Row} from 'native-base';
import StoreNavigation from './StoreNavigation';
import {connect} from 'react-redux';
import CartScreen from '../screens/CartScreen';
import {Thumbnail} from 'native-base';
import {FontAwesome, Ionicons} from '@expo/vector-icons';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'StoreNavigation';

const bottomTabNavigator = (props) => {
  const {navigation, route} = props;

  navigation.setOptions({
    headerTitle: (props) => (
      <View style={{paddingRight: 5}}>
        <Row>
          <Text style={{fontWeight: 'bold', fontSize: 20, color: '#7a0'}}>
            KickFresh
          </Text>
        </Row>
        <Row>
          <Text style={{color: '#aaa'}}>Store to Your Door</Text>
        </Row>
      </View>
    ),
    headerRight: () => (
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={() => {
            console.log('USERSCREEN');
            props.navigation.navigate('User');
          }}
          style={{
            height: '100%',
            backgroundColor: '#fff',
            alignItems: 'center',
            paddingHorizontal: 15,
            flexDirection: 'row',
          }}>
          <Thumbnail
            style={{width: 30, height: 30, display: 'none'}}
            source={{
              uri:
                'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg',
            }}
          />
          <Text
            style={{color: '#aaa', fontWeight: '600', paddingHorizontal: 5}}>
            SignIN To Order
          </Text>
        </TouchableOpacity>
        <Button
          transparent
          onPress={() => {
            navigation.navigate('Cart');
          }}>
          <View
            style={{
              justifyContent: 'center',
              paddingHorizontal: 10,
              borderWidth: 0,
            }}>
            <View
              style={{
                position: 'absolute',
                top: -10,
                right: 14,
              }}>
              <Text style={{color: '#aaa', fontWeight: 'bold'}}>
                {props.cart.length ? props.cart.length : 0}
              </Text>
            </View>
            <FontAwesome
              style={{
                color: '#aaa',
                fontSize: 30,
                width: 40,
                height: 40,
              }}
              name="shopping-cart"
            />
          </View>
        </Button>
      </View>
    ),
  });

  useEffect(() => {
    //effect
    return () => {
      //cleanup
    };
  });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="StoreNavigation"
        component={StoreNavigation}
        options={{
          title: '',
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
    case 'Home':
      return 'FreshKick';
    case 'Links':
      return 'Links to learn more';
  }
}

export default BottomTabNavigator = connect((state) => ({
  cart: state.cartReducer.cartList,
}))(bottomTabNavigator);
