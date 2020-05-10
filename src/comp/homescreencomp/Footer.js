import React from 'react';
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import {FontAwesome5} from '@expo/vector-icons';

const window = Dimensions.get('window');

export const Footer = (props) => {
  return (
    <View style={{marginBottom: 30}}>
      <View
        style={[
          ComStyles.container,
          window.width < 500 ? MobStyles.container : PcStyles.container,
        ]}>
        <View
          style={[
            ComStyles.block1,
            window.width < 500 ? MobStyles.block1 : PcStyles.block1,
          ]}>
          <Text style={ComStyles.heading}>FreshKick</Text>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('AboutUs');
            }}>
            <Text style={ComStyles.text}>About Us</Text>
          </TouchableOpacity>
          <Text style={ComStyles.text}>Order Tracking</Text>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('PaymentTerms');
            }}>
            <Text style={ComStyles.text}>Payment Terms</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('ReturnPolicy');
            }}>
            <Text style={ComStyles.text}>Return Policy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('Terms');
            }}>
            <Text style={ComStyles.text}>Terms & Conditions</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('PrivacyPolicy');
            }}>
            <Text style={ComStyles.text}>Privacy Policy</Text>
          </TouchableOpacity>
        </View>
        <View
          style={[
            ComStyles.block2,
            window.width < 500 ? MobStyles.block2 : PcStyles.block2,
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
            window.width < 500 ? MobStyles.block3 : PcStyles.block3,
          ]}>
          <Text style={ComStyles.heading}>Newsletter</Text>
          <Text style={ComStyles.text}>
            Submite to stay updated with latest Product and offers
          </Text>
        </View>
      </View>
      <Row>
        <FontAwesome5
          style={{color: '#fff', fontSize: 25, paddingHorizontal: 10}}
          name="facebook"
        />
        <FontAwesome5
          style={{color: '#fff', fontSize: 25, paddingHorizontal: 10}}
          name="instagram"
        />
        <FontAwesome5
          style={{color: '#fff', fontSize: 25, paddingHorizontal: 10}}
          name="twitter"
        />
        <FontAwesome5
          style={{color: '#fff', fontSize: 25, paddingHorizontal: 10}}
          name="linkedin"
        />
      </Row>
    </View>
  );
};

import {StyleSheet} from 'react-native';
import {Row} from '../../../assets/components/Layouts';

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
  text: {color: '#fff', fontSize: 14, marginVertical: 3},
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
