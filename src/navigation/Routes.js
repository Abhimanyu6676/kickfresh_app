import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import BottomTabNavigator from './BottomTabNavigator';
import AboutUs from '../screens/AboutUs';
import PaymentTerms from '../screens/PaymentTerms';
import RefundPolicy from '../screens/RefundPolicy';
import Terms from '../screens/Terms';
import PrivacyPolicy from '../screens/PrivacyPolicy';
import {LoginSignUpHandler} from '../comp/userInfo/LoginSignUpHandler';
import UserProfile from '../comp/userInfo/UserProfile';
import ContactUs from '../screens/ContactUs';
import OrderTracking from '../screens/OrderTracking';

const Stack = createStackNavigator();

export default AppStackNavigator = (props) => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Store-Home">
        <Stack.Screen name="Store-Home" component={BottomTabNavigator} />
        <Stack.Screen name="About Us" component={AboutUs} />
        <Stack.Screen name="Payment Terms" component={PaymentTerms} />
        <Stack.Screen name="Refund Policy" component={RefundPolicy} />
        <Stack.Screen name="Privacy Policy" component={PrivacyPolicy} />
        <Stack.Screen name="Terms N Consitions" component={Terms} />
        <Stack.Screen name="Contact Us" component={ContactUs} />
        <Stack.Screen name="Order Tracking" component={OrderTracking} />
        <Stack.Screen
          name="LoginSignUpHandler"
          component={LoginSignUpHandler}
        />
        <Stack.Screen name="UserProfile" component={UserProfile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
