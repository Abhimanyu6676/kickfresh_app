import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, Dimensions} from 'react-native';
import SignIN from './SignIN';
import SignUP from './SignUP';
import {primaryColor} from '../../../assets/theme/global_colors';
import {Footer} from '../homescreencomp/Footer';

const window = Dimensions.get('window');

/**
 * @param  {props, navigation<navigatorObject>, login<boolean>}
 *      - props
 *          - - navigation
 *          - - login - if 'true' the SignIN screen will show up
 */
export const LoginSignUpHandler = (props) => {
  const {navigation} = props;
  const [SignupScreen, setSignupScreen] = useState(
    props.route.params?.login ?? false,
  );

  navigation.setOptions({
    headerStyle: ComStyles.headerStyle,
    headerTintColor: '#fff',
    headerTitle: () => (
      <View>
        <Text style={{color: '#fff', fontSize: 20, fontWeight: 'bold'}}>
          Login/Signup
        </Text>
      </View>
    ),
  });

  const switcher = (screen) => {
    switch (screen) {
      case 'IN':
        setSignupScreen(false);
        return;
      case 'UP':
        setSignupScreen(true);
    }
  };

  return (
    <ScrollView style={{backgroundColor: '#fff'}}>
      <View>
        <View
          style={[
            ComStyles.loginSignUpView,
            window.width < 500
              ? MobStyles.loginSignUpView
              : PcStyles.loginSignUpView,
          ]}>
          {SignupScreen && (
            <SignUP
              switcher={switcher}
              window={window}
              navigation={navigation}
            />
          )}
          {!SignupScreen && (
            <SignIN
              switcher={switcher}
              window={window}
              navigation={navigation}
            />
          )}
        </View>
        <View
          style={[
            ComStyles.Footer,
            window.width < 500 ? MobStyles.Footer : PcStyles.Footer,
          ]}>
          <Footer />
        </View>
      </View>
    </ScrollView>
  );
};

import {StyleSheet} from 'react-native';

const ComStyles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderWidth: 0,
  },
  headerStyle: {
    backgroundColor: primaryColor,
    color: '#fff',
  },
  headerTitle: {paddingRight: 5, borderWidth: 0, color: '#fff'},
  loginSignUpView: {},
  Footer: {backgroundColor: primaryColor, marginTop: 20, width: '100%'},
});

const MobStyles = StyleSheet.create({
  container: {},
  loginSignUpView: {},
  Footer: {},
});

const TabStyles = StyleSheet.create({
  container: {},
  loginSignUpView: {},
  Footer: {},
});

const PcStyles = StyleSheet.create({
  container: {},
  loginSignUpView: {paddingHorizontal: '20%'},
  Footer: {},
});
