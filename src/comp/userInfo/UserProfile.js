import React from 'react';
import {View, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import UserInfo from './UserInfo';
import UserOrderHistory from './UserOrderHistory';

const Stack = createStackNavigator();

export default UserProfile = (props) => {
  const {navigation} = props;
  return (
    <Stack.Navigator initialRouteName="UserInfo">
      <Stack.Screen name="UserInfo" component={UserInfo} />
      <Stack.Screen name="UserOrderHistory" component={UserOrderHistory} />
    </Stack.Navigator>
  );
};
