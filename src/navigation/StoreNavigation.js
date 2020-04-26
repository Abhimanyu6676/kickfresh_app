import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../comp/homescreencomp/HomeScreen';
import SubCategory from '../comp/homescreencomp/subcategory/SubCategory';

const Stack = createStackNavigator();

export default StoreNavigation = (props) => {
  return (
    <Stack.Navigator initialRouteName="StoreHome">
      <Stack.Screen name="StoreHome" component={HomeScreen} />
      <Stack.Screen name="SubCategory" component={SubCategory} />
    </Stack.Navigator>
  );
};
