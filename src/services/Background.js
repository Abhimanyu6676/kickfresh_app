import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import Cookies from 'js-cookie';
import {useDispatch} from 'react-redux';
import {UserAction} from '../redux/actions/UserAction';
import {cartListAction} from '../redux/actions/CartListAction';
import {server, server2, getUserAPI} from './REST';
import {saveToStorage, fetchFromStorage, removeFromStorage} from './Storage';

export default Background = (props) => {
  const [timerRunning, setTimerRunning] = useState(false);
  const [cartUpdated, setCartUpdated] = useState(false);
  const [userUpdated, setUserUpdated] = useState(false);
  const dispatch = useDispatch();

  //art@world5fund.com

  useEffect(() => {
    if (false) {
      removeFromStorage({key: '__userObj'});
      removeFromStorage({key: '__user'});
      removeFromStorage({key: '__token'});
      Cookies.remove('_user', {path: '/', domain: '192.168.1.6'});
      Cookies.remove('__user');
      Cookies.remove('__userObj');
      Cookies.remove('__token');
    }
    if (!userUpdated) {
      fetchFromStorage({key: '__userObj'})
        .then((res) => {
          console.log('***' + res);
          dispatch(UserAction({User: JSON.parse(res)}));
        })
        .catch((err) => {
          console.log('***' + err);
        });
    }
    let cart = Cookies.get('cart');
    if (cart && cart != 'undefined' && !cartUpdated) {
      var obj = JSON.parse(cart);
      console.log('cart>> ' + JSON.stringify(obj));
      setCartUpdated(true);
      dispatch(cartListAction({cartList: obj}));
    }
    if (!userUpdated) {
      //if (false) {
      console.log(
        'BACKGROUND SERVICE fetching>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',
      );
      getUserAPI()
        .then((response) => {
          //validate response
          //-->upon no user found -- Cookies.remove('__user'); Cookies.remove('__userObj');
          console.log('getUserAPI response >>>');
          console.log(response);
          const u = response;
          saveToStorage({key: '__user', value: u.username});
          saveToStorage({key: '__userObj', value: JSON.stringify(u)});
          dispatch(UserAction(u));
          setUserUpdated(true);
        })
        .catch((err) => {});
    } else {
    }

    return () => {};
  });

  return <View></View>;
};
