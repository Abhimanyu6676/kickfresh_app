import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Form, Item, Input, Label} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {signInAPI} from '../../services/REST';
import {UserAction} from '../../redux/actions/UserAction';
import Cookies from 'js-cookie';
import {
  FontAwesome,
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome5,
} from '@expo/vector-icons';
import {LinearGradient} from 'expo-linear-gradient';
import {saveToStorage, fetchFromStorage} from '../../services/Storage';

export default SignIN = (props) => {
  const [username, setUsername] = useState('Abhi11');
  const [pass, setPass] = useState('12345678');
  const dispatch = useDispatch();
  let {window, navigation} = props;

  const handleSignIN = () => {
    signInAPI({username, pass})
      .then((res) => {
        console.log('signInAPI Response>> ' + JSON.stringify(res));
        if (res.item.username && res.token) {
          const u = res.item;
          console.log('user>> ' + u.username);
          console.log('userObj>> ' + JSON.stringify(u));
          console.log('Token>> ' + res.token);
          saveToStorage({key: '__user', value: u.username});
          saveToStorage({key: '__userObj', value: JSON.stringify(res.item)});
          saveToStorage({key: '__token', value: res.token});
          dispatch(UserAction(u));
          navigation.replace('UserProfile');
        } else {
          alert('Unexpected Error, Please Try again');
        }
      })
      .catch((err) => {
        console.log('signUpAPI Error' + JSON.stringify(err));
        alert(
          'Authentication Failed! Username or Password Incorrect, Please try again',
        );
      });
  };

  return (
    <View style={ComStyles.container}>
      <Text
        style={{
          fontSize: 30,
          fontWeight: 'bold',
          color: '#0a0',
          marginVertical: 15,
          marginLeft: 10,
        }}>
        Login To Your Account
      </Text>
      <Form>
        <View
          style={[
            ComStyles.field,
            window.width < 500 ? MobStyles.field : PcStyles.field,
          ]}>
          <View style={{borderWidth: 0, justifyContent: 'center'}}>
            <MaterialIcons
              name="email"
              style={{fontSize: 18, color: '#0a0', paddingHorizontal: 15}}
            />
          </View>
          <View style={{flex: 1, borderWidth: 0}}>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input onChangeText={(text) => setUsername(text)} />
            </Item>
          </View>
        </View>

        <View
          style={[
            ComStyles.field,
            window.width < 500 ? MobStyles.field : PcStyles.field,
          ]}>
          <View style={{borderWidth: 0, justifyContent: 'center'}}>
            <MaterialCommunityIcons
              name="textbox-password"
              style={{fontSize: 18, color: '#0a0', paddingHorizontal: 15}}
            />
          </View>
          <View style={{flex: 1, borderWidth: 0}}>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input onChangeText={(text) => setPass(text)} />
            </Item>
          </View>
        </View>
      </Form>

      <View
        style={{
          borderWidth: 0,
          width: '100%',
          marginTop: 20,
          alignItems: 'flex-end',
        }}>
        <LinearGradient
          colors={['#5AFF15', '#00B712']}
          style={{borderRadius: 20, elevation: 4, marginTop: 40}}
          start={[0.3, 0]}
          end={[1, 0]}>
          <TouchableOpacity
            style={{
              width: 150,
              height: 40,
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'flex-end',
              flexDirection: 'row',
            }}
            onPress={handleSignIN}>
            <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 18}}>
              Login
            </Text>
            <FontAwesome5
              name="arrow-right"
              style={{
                fontSize: 18,
                color: '#fff',
                marginRight: 10,
                marginLeft: 30,
              }}
            />
          </TouchableOpacity>
        </LinearGradient>
      </View>
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 60,
          marginBottom: 20,
          flexDirection: 'row',
          borderWidth: 0,
        }}>
        <Text style={{color: '#aaa'}}>Don't have an account</Text>
        <TouchableOpacity onPress={() => props.switcher('UP')}>
          <Text style={{color: '#0a0', fontWeight: 'bold', marginLeft: 10}}>
            SignUP
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

import {StyleSheet} from 'react-native';

const ComStyles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderWidth: 0,
    marginHorizontal: 5,
    paddingHorizontal: 5,
  },
  field: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 5,
    marginTop: 10,
    flexDirection: 'row',
    shadowColor: '#aaa',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 2,
  },
});

const MobStyles = StyleSheet.create({
  container: {},
  field: {},
});

const TabStyles = StyleSheet.create({
  container: {},
  field: {},
});

const PcStyles = StyleSheet.create({
  container: {},
  field: {marginVertical: 20},
});
