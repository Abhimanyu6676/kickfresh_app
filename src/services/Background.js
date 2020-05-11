import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import Cookies from 'js-cookie';
import useAxios from 'axios-hooks';
import {useDispatch} from 'react-redux';
import {UserAction} from '../redux/actions/UserAction';
import {cartListAction} from '../redux/actions/CartListAction';
import {server} from './REST';

export default Background = (props) => {
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();
  let cookie = Cookies.get('__userObj');
  if (cookie && cookie != 'undefined') _params = {__userObj: cookie};
  else _params = {};
  const [{data, loading, error}, executeGet] = useAxios(
    {
      url: server + '/user',
      withCredentials: true,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      params: _params,
      timeout: 2500,
    },
    {manual: true},
  );

  //art@world5fund.com

  useEffect(() => {
    console.log('>>>>>cookie test>>>>>>');
    console.log(Cookies.get('__user') ? Cookies.get('__user') : '--');
    console.log(Cookies.get('__userObj') ? Cookies.get('__userObj') : '--');
    let cart = Cookies.get('cart');
    if (cart) {
      var obj = JSON.parse(cart);
      console.log('cart>> ' + JSON.stringify(obj));
      dispatch(cartListAction({cartList: obj}));
    }
    if (data && data.username) {
      console.log(
        'user>> ' +
          JSON.stringify(data.username) +
          ' >> ' +
          JSON.stringify(data),
      );
      const u = {
        username: data.username,
        Phone: null,
        Address: [],
        Email: null,
        Token: JSON.stringify(data),
      };
      Cookies.set('__user', data.username);
      Cookies.set('__userObj', data);
      dispatch(UserAction({User: u}));
    } else if (data && data == 'No User Found') {
      Cookies.remove('__user');
      setCount(count + 1);
    }
    const service = setInterval(() => {
      if (!data) {
        executeGet();
      } else {
      }
    }, 3000);
    return () => {
      clearInterval(service);
    };
  });

  return <View></View>;
};
