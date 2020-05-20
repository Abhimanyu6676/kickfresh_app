import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../comp/homescreencomp/HomeScreen';
import SubCategory from '../comp/homescreencomp/subcategory/SubCategory';
import {View, Platform} from 'react-native';

const Stack = createStackNavigator();

export default StoreNavigation = (props) => {
  return (
    <Stack.Navigator initialRouteName="StoreHome">
      <Stack.Screen
        name="StoreHome"
        component={HomeScreen}
        initialParams={{ref: props.route.params.ref}}
      />
      <Stack.Screen name="SubCategory" component={SubCategory} />
    </Stack.Navigator>
  );
};
