import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, Dimensions} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Footer} from '../comp/homescreencomp/Footer';
import {primaryColor} from '../../assets/theme/global_colors';
import {LoginSignUpHandler} from '../comp/userInfo/LoginSignUpHandler';
import UserProfile from '../comp/userInfo/UserProfile';

const window = Dimensions.get('window');

export default UserScreen = (props) => {
  const [ShowHandler, setShowHandler] = useState(false);
  const {navigation, route} = props;
  const User = useSelector((state) => state.userReducer.User);

  useEffect(() => {
    if (!User.username || User.username.includes('temp')) {
      setShowHandler(true);
    } else {
      setShowHandler(false);
    }
    return () => {};
  });

  navigation.setOptions({
    headerStyle: {backgroundColor: primaryColor},
    headerTitle: (props) => (
      <View>
        {ShowHandler && (
          <Text style={{color: '#fff', fontSize: 20, fontWeight: 'bold'}}>
            SignUp
          </Text>
        )}
        {!ShowHandler && (
          <Text style={{color: '#fff', fontSize: 20, fontWeight: 'bold'}}>
            UserProfile
          </Text>
        )}
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

  return (
    <ScrollView>
      {/* <Text>{User.username ? User.username : 'no user'}</Text> */}
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: window.height - 50,
          borderWidth: 1,
        }}>
        {ShowHandler && (
          <View
            style={[
              ComStyles.SignupView,
              window.width < 500 ? MobStyles.SignupView : PcStyles.SignupView,
            ]}>
            <LoginSignUpHandler navigation={navigation} login={false} />
          </View>
        )}

        {!ShowHandler && (
          <View
            style={[
              ComStyles.UserProfile,
              window.width < 500 ? MobStyles.UserProfile : PcStyles.UserProfile,
            ]}>
            <UserProfile navigation={navigation} />
          </View>
        )}

        <View
          style={[
            ComStyles.footer,
            window.width < 500 ? MobStyles.footer : PcStyles.footer,
          ]}>
          <Footer navigation={navigation} />
        </View>
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
  UserProfile: {
    backgroundColor: '#fff',
    borderWidth: 0,
    flexGrow: 1,
  },
  footer: {backgroundColor: primaryColor},
});

const MobStyles = StyleSheet.create({
  SignupView: {paddingHorizontal: 5},
  UserProfile: {paddingHorizontal: 5, minHeight: window.height * 0.7},
  footer: {paddingHorizontal: 5},
});

const TabStyles = StyleSheet.create({
  SignupView: {},
  UserProfile: {},
  footer: {},
});

const PcStyles = StyleSheet.create({
  SignupView: {paddingHorizontal: '20%'},
  UserProfile: {paddingHorizontal: '20%'},
  footer: {paddingHorizontal: '10%'},
});
