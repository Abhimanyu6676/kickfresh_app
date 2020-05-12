import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Form, Item, Input, Label} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {signUpAPI, signIN} from '../../services/REST';
import {UserAction} from '../../redux/actions/UserAction';
import Cookies from 'js-cookie';
import {
  FontAwesome,
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome5,
} from '@expo/vector-icons';
import {LinearGradient} from 'expo-linear-gradient';

export default SignUP = (props) => {
  const [username, setUsername] = useState('Abhimanyu');
  const [pass, setPass] = useState('12345678');
  const [rePass, setRePass] = useState('12345678');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('SIGNUP');
    return () => {};
  });

  const handleSignUP = () => {
    if (validateUsername() && validatePass() && validateEmail()) {
      console.log('validated');
      signUpAPI({username, pass, email, phone})
        .then((res) => {
          console.log('signUpAPI Response>> ' + JSON.stringify(res));
          if (res.token) {
            const u = res.item;
            console.log('user>> ' + u.username);
            console.log('userObj>> ' + JSON.stringify(u));
            console.log('Token>> ' + res.token);
            Cookies.set('__user', u.username);
            Cookies.set('__userObj', res.item);
            Cookies.set('__token', res.token);
            dispatch(UserAction({User: u}));
          } else {
            alert('Unexpected Error');
          }
        })
        .catch((err) => {
          console.log('signUpAPI Error' + JSON.stringify(err));
          alert(err.message);
        });
    } else {
      console.log('validation failed');
    }
  };

  const validateUsername = () => {
    if (username.toString().length < 6) {
      alert('Invalid Username, Please try another Username');
      return false;
    }
    return true;
  };

  const validatePass = () => {
    if (pass != rePass) {
      alert("Password doesn't match, Re-enter Password");
      return false;
    } else {
      if (pass.toString().length < 8) {
        alert('Password Length must me greater than 8 digit atleast');
        return false;
      }
    }
    return true;
  };

  const validateEmail = () => {
    var x = email.toString();
    var atposition = x.indexOf('@');
    var dotposition = x.lastIndexOf('.');
    if (
      x.length < 2 ||
      atposition < 1 ||
      dotposition < atposition + 2 ||
      dotposition + 2 >= x.length
    ) {
      alert('Please enter a valid e-mail address \n atpostion:');
      return false;
    }
    return true;
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
        Create Account = {props.user.username}
      </Text>
      <Form>
        <View style={ComStyles.field}>
          <View style={{borderWidth: 0, justifyContent: 'center'}}>
            <FontAwesome
              name="sort-alpha-asc"
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
        <View style={ComStyles.field}>
          <View style={{borderWidth: 0, justifyContent: 'center'}}>
            <MaterialIcons
              name="email"
              style={{fontSize: 18, color: '#0a0', paddingHorizontal: 15}}
            />
          </View>
          <View style={{flex: 1, borderWidth: 0}}>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input onChangeText={(text) => setEmail(text)} />
            </Item>
          </View>
        </View>
        <View style={ComStyles.field}>
          <View style={{borderWidth: 0, justifyContent: 'center'}}>
            <MaterialCommunityIcons
              name="textbox-password"
              style={{fontSize: 18, color: '#0a0', paddingHorizontal: 15}}
            />
          </View>
          <View style={{flex: 1, borderWidth: 0}}>
            <Item floatingLabel>
              <Label>Password</Label>
              <Input onChangeText={(text) => setPass(text)} />
            </Item>
          </View>
        </View>
        <View style={ComStyles.field}>
          <View style={{borderWidth: 0, justifyContent: 'center'}}>
            <MaterialCommunityIcons
              name="textbox-password"
              style={{fontSize: 18, color: '#0a0', paddingHorizontal: 15}}
            />
          </View>
          <View style={{flex: 1, borderWidth: 0}}>
            <Item floatingLabel last>
              <Label>Re-Type Password</Label>
              <Input onChangeText={(text) => setRePass(text)} />
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
            onPress={handleSignUP}>
            <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 18}}>
              SignUP
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
        <Text style={{color: '#aaa'}}>Already have an account</Text>
        <TouchableOpacity onPress={() => props.switcher('IN')}>
          <Text style={{color: '#0a0', fontWeight: 'bold', marginLeft: 10}}>
            LogIN
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
  field: {},
});
