import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, Dimensions} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Footer} from '../comp/homescreencomp/Footer';
import {primaryColor} from '../../assets/theme/global_colors';
import {LoginSignUpHandler} from '../comp/userInfo/LoginSignUpHandler';

const window = Dimensions.get('window');

export default UserScreen = (props) => {
  const [ShowHandler, setShowHandler] = useState(false);
  const {navigation, route} = props;
  const User = useSelector((state) => state.userReducer.User);

  navigation.setOptions({
    headerTitle: (props) => (
      <View>
        <Text style={{color: '#0a0', fontSize: 20, fontWeight: 'bold'}}>
          SignUp
        </Text>
      </View>
    ),
    headerRight: () => (
      <View
        style={{
          justifyContent: 'center',
          paddingHorizontal: 15,
          borderWidth: 0,
        }}></View>
    ),
  });

  useEffect(() => {
    if (!User.username || User.username.includes('temp')) {
      setShowHandler(true);
    } else {
      setShowHandler(false);
    }
    return () => {};
  });

  return (
    <ScrollView>
      {/* <Text>{User.username ? User.username : 'no user'}</Text> */}

      {ShowHandler && (
        <View
          style={[
            ComStyles.SignupView,
            window.width < 500 ? MobStyles.SignupView : PcStyles.SignupView,
          ]}>
          <LoginSignUpHandler navigation={navigation} login={false} />
        </View>
      )}

      <View style={{width: '100%', backgroundColor: primaryColor}}>
        <Footer navigation={navigation} />
      </View>
    </ScrollView>
  );
};

import {StyleSheet} from 'react-native';

const ComStyles = StyleSheet.create({
  SignupView: {
    backgroundColor: '#fff',
    borderWidth: 0,
  },
});

const MobStyles = StyleSheet.create({
  SignupView: {paddingHorizontal: 5},
});

const TabStyles = StyleSheet.create({
  SignupView: {},
});

const PcStyles = StyleSheet.create({
  SignupView: {paddingHorizontal: '20%'},
});
