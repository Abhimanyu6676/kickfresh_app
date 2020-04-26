import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import * as React from 'react';
import {View, Text} from 'react-native';
import TabBarIcon from '../../components/TabBarIcon';
import LinksScreen from '../screens/LinksScreen';
import {Button, Icon, Row} from 'native-base';
import StoreNavigation from './StoreNavigation';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({navigation, route}) {
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
      <Button
        transparent
        onPress={() => {
          navigation.navigate('Cart');
        }}>
        <View
          style={{
            justifyContent: 'center',
            paddingHorizontal: 15,
            borderWidth: 0,
            /* backgroundColor: '#f00', */
          }}>
          <Icon name="cart" style={{color: '#7a0'}} />
        </View>
      </Button>
    ),
  });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="StoreNavigation"
        component={StoreNavigation}
        options={{
          title: 'StoreNavigation',
          tabBarIcon: ({focused}) => (
            <TabBarIcon focused={focused} name="md-code-working" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Subscriptions"
        component={LinksScreen}
        options={{
          title: 'Subscriptions',
          tabBarIcon: ({focused}) => (
            <TabBarIcon focused={focused} name="md-book" />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

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
