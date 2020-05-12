import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import Cookies from 'js-cookie';
import useAxios from 'axios-hooks';
import {useDispatch} from 'react-redux';
import {UserAction} from '../redux/actions/UserAction';
import {cartListAction} from '../redux/actions/CartListAction';
import {server, getUserAPI} from './REST';

export default Background = (props) => {
  const [timerRunning, setTimerRunning] = useState(false);
  const [cartUpdated, setCartUpdated] = useState(false);
  const [userUpdated, setUserUpdated] = useState(false);
  const dispatch = useDispatch();

  //art@world5fund.com

  useEffect(() => {
    console.log(
      'BACKGROUND SERVICE STARTED>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',
    );
    let userObj = Cookies.get('__userObj');
    if (userObj && userObj != 'undefined' && !userUpdated) {
      console.log('>>>>>user cookie found>>>>>>');
      console.log(Cookies.get('__user') ? Cookies.get('__user') : '--');
      console.log(Cookies.get('__userObj') ? Cookies.get('__userObj') : '--');
      setUserUpdated(true);
      dispatch(UserAction({User: JSON.parse(userObj)}));
    }

    let cart = Cookies.get('cart');
    if (cart && cart != 'undefined' && !cartUpdated) {
      var obj = JSON.parse(cart);
      console.log('cart>> ' + JSON.stringify(obj));
      setCartUpdated(true);
      dispatch(cartListAction({cartList: obj}));
    }
    //if (!userUpdated) {
    if (false) {
      getUserAPI()
        .then((response) => {
          //validate response
          //-->upon no user found -- Cookies.remove('__user'); Cookies.remove('__userObj');
          console.log('getUserAPI response >>>');
          console.log(response.data);
          const u = response.data;
          Cookies.set('__user', u.username);
          Cookies.set('__userObj', u);
          console.log('Setting state');
          dispatch(UserAction({User: u}));
          setUserUpdated(true);
        })
        .catch((err) => {
          //Cookies.remove('__user'); Cookies.remove('__userObj');
          console.log('getUserAPI error >>');
          console.log(err);
        });
    } else {
    }

    return () => {};
  });

  return <View></View>;
};
