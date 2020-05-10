import React from 'react';
import {View, Text} from 'react-native';

export default UserOrderHistory = (props) => {
  const {navigation} = props;

  navigation.setOptions({headerShown: false});

  return (
    <View>
      <Text>UserOrderHistory</Text>
    </View>
  );
};
