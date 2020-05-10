import React from 'react';
import {View} from 'react-native';

export const Row = (props) => {
  return (
    <View style={[{flexDirection: 'row'}, props._style]}>{props.children}</View>
  );
};

export const Col = (props) => {
  return (
    <View style={[{flexDirection: 'column'}, props._style]}>
      {props.children}
    </View>
  );
};
