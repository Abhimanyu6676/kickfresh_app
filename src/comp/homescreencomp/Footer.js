import React from 'react';
import {View, Text} from 'react-native';

export const Footer = (props) => {
  return (
    <View
      style={[
        ComStyles.container,
        props.dimensions.window.width < 500
          ? MobStyles.container
          : PcStyles.container,
      ]}>
      <View
        style={[
          ComStyles.block1,
          props.dimensions.window.width < 500
            ? MobStyles.block1
            : PcStyles.block1,
        ]}>
        <Text style={ComStyles.heading}>FreshKick</Text>
        <Text style={ComStyles.text}>About Us</Text>
        <Text style={ComStyles.text}>Contact US</Text>
        <Text style={ComStyles.text}>Order Tracking</Text>
        <Text style={ComStyles.text}>Payment Help</Text>
        <Text style={ComStyles.text}>Payment Terms</Text>
        <Text style={ComStyles.text}>Return Policy</Text>
        <Text style={ComStyles.text}>Terms & Conditions</Text>
        <Text style={ComStyles.text}>Privacy Policy</Text>
      </View>
      <View
        style={[
          ComStyles.block2,
          props.dimensions.window.width < 500
            ? MobStyles.block2
            : PcStyles.block2,
        ]}>
        <Text style={ComStyles.heading}>Order From</Text>
        <Text style={ComStyles.text}>Website</Text>
        <Text style={ComStyles.text}>KickFresh on Play Store</Text>
        <Text style={ComStyles.text}>KickFresh on App Store</Text>
        <Text style={ComStyles.text}>WhatsApp Number</Text>
      </View>
      <View
        style={[
          ComStyles.block3,
          props.dimensions.window.width < 500
            ? MobStyles.block3
            : PcStyles.block3,
        ]}>
        <Text style={ComStyles.heading}>Newsletter</Text>
        <Text style={ComStyles.text}>
          Submite to stay updated with latest Product and offers
        </Text>
      </View>
    </View>
  );
};

import {StyleSheet} from 'react-native';

const ComStyles = StyleSheet.create({
  container: {
    borderWidth: 0,
    paddingHorizontal: 10,
    display: 'flex',
  },
  block1: {borderWidth: 0, paddingVertical: 10},
  block2: {borderWidth: 0, paddingVertical: 10},
  block3: {borderWidth: 0, paddingVertical: 10},
  heading: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  text: {color: '#fff', fontSize: 14, marginVertical: 2},
});

const MobStyles = StyleSheet.create({
  container: {marginVertical: 20, flexDirection: 'column'},
  block1: {},
  block2: {},
  block3: {},
});

const TabStyles = StyleSheet.create({
  container: {},
  block1: {},
  block2: {},
  block3: {},
});

const PcStyles = StyleSheet.create({
  container: {marginVertical: 25, flexDirection: 'row'},
  block1: {flex: 1},
  block2: {flex: 1},
  block3: {flex: 1},
});
