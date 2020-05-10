import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import SignIN from './SignIN';
import SignUP from './SignUP';
import {signIN} from '../../services/REST';

/**
 * @param  {props, navigation<navigatorObject>, login<boolean>}
 *      - props
 *          - - navigation
 *          - - login - if 'true' the SignIN screen will show up
 *
 * @requires navigation-prop
 *
 *
 */
export const LoginSignUpHandler = (props) => {
  const {navigation} = props;
  const [SignupScreen, setSignupScreen] = useState(props.login ? false : true);

  /* useEffect(() => {
    if (_login) setSignupScreen(false);
    login = false;
    return () => {};
  }); */

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
    <View>
      {SignupScreen && <SignUP switcher={switcher} />}
      {!SignupScreen && <SignIN switcher={switcher} />}
    </View>
  );
};
