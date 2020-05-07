import React, {useState, useEffect} from 'react';
import {View, Text, Button, TouchableOpacity} from 'react-native';
import {Form, Item, Input, Label, Container, Content} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {createUser, signIN, GET} from '../services/REST';
import SignUP from '../comp/userInfo/SignUP';

export default UserScreen = (props) => {
  const [ShowSignUP, setShowSignUP] = useState(false);
  const {navigation, route} = props;
  const User = useSelector((state) => state.userReducer.User);
  const dispatch = useDispatch();

  navigation.setOptions({
    headerTitle: (props) => <View style={{paddingRight: 5}}></View>,
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
      setShowSignUP(true);
    } else {
      setShowSignUP(false);
    }
    return () => {};
  });

  return (
    <View>
      <Text>{User.username ? User.username : 'no user'}</Text>
      {ShowSignUP && <SignUP />}
    </View>
  );
};
