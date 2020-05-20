import React from 'react';
import {FontAwesome5} from '@expo/vector-icons';
import Colors from '../constants/Colors';
import {Text, View} from 'react-native';

export default function TabBarIcon(props) {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0,
        width: 50,
      }}>
      <FontAwesome5
        style={{
          color: props.focused ? Colors.tabIconSelected : Colors.tabIconDefault,
          marginVertical: 0,
          fontSize: 20,
        }}
        name={props.name}
      />
      <Text
        style={{
          color: props.focused ? Colors.tabIconSelected : Colors.tabIconDefault,
          fontSize: 12,
          marginBottom: 0,
        }}>
        {props.title}
      </Text>
    </View>
  );
}
