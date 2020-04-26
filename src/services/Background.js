import React, {useEffect} from 'react';
import {View} from 'react-native';
import Cookies from 'js-cookie';

export default Background = (props) => {
  useEffect(() => {
    const service = setInterval(() => {
      console.log('^^^^' + JSON.stringify(Cookies.get('test1')));
    }, 1000);
    return () => {
      clearInterval(service);
    };
  });

  return <View></View>;
};
