import React from 'react';
import {View, Text, Image, Dimensions, ScrollView} from 'react-native';
import {server2} from '../services/REST';
import {Footer} from '../comp/homescreencomp/Footer';

const window = Dimensions.get('window');

export default AboutUs = (props) => {
  return (
    <ScrollView>
      <View
        style={[
          ComStyles.container,
          window.width < 500 ? MobStyles.container : PcStyles.container,
        ]}>
        <View
          style={{
            flex: 1,
            flexGrow: 1,
            backgroundColor: '#fff',
            paddingVertical: 100,
          }}>
          <View style={{borderWidth: 0, alignItems: 'center'}}>
            <Image
              style={{height: 150, width: 150}}
              source={{uri: server2 + '/LogoImages/LOGO_400x400px.png'}}
            />
            <Text
              style={{
                color: primaryColor,
                marginTop: 15,
                fontSize: 25,
                fontWeight: 'bold',
              }}>
              FreshKick
            </Text>
            <Text style={{color: primaryColor}}>Store at your Door</Text>
            <Text
              style={{
                color: primaryColor,
                fontWeight: 'bold',
                fontSize: 18,
                marginTop: 10,
              }}>
              V 1.0
            </Text>
          </View>
          <View>
            <Text
              style={[
                ComStyles.aboutUsText1,
                window.width < 500
                  ? MobStyles.aboutUsText1
                  : window.width < 800
                  ? TabStyles.aboutUsText1
                  : PcStyles.aboutUsText1,
              ]}>
              Freshkick.in, India's low price online supermarket in grocery &
              house hold space. We use our in-house technology platform to
              partner with your local grocery stores & local grocery sellers to
              serve groceries and daily essentials on reasonable rates during
              LOCKDOWN period so that nobody can face issues during COVID 19
              pandemic
            </Text>
            <Text
              style={[
                ComStyles.aboutUsText1,
                window.width < 500
                  ? MobStyles.aboutUsText1
                  : window.width < 800
                  ? TabStyles.aboutUsText1
                  : PcStyles.aboutUsText1,
              ]}>
              As a human being we can stop going to the cinema, markets, and
              restaurants, but there's no way to live without toothpaste, soap,
              vegetables and other daily needed products. The spending on
              grocery and daily essentials is the largest and most consistent
              share of the wallet for any household. We offer a wide range of
              categories like Vegetables, Fruits, Baby care, Eggs & Meat
              Products, Food Grains, Edible Oils & Masala
            </Text>
            <Text style={{color: '#444', textAlign: 'center', marginTop: 20}}>
              support@freshkick.in
            </Text>
            <Text style={{color: '#444', textAlign: 'center'}}>
              +91 9582463222
            </Text>
          </View>
        </View>
        <View
          style={[
            ComStyles.footer,
            window.width < 500 ? MobStyles.footer : PcStyles.footer,
          ]}>
          <Footer navigation={props.navigation} />
        </View>
      </View>
    </ScrollView>
  );
};

import {StyleSheet} from 'react-native';
import {primaryColor} from '../../assets/theme/global_colors';

const ComStyles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderWidth: 0,
    width: '100%',
    minHeight: window.height - 60,
    display: 'flex',
    flexDirection: 'column',
  },
  aboutUsText1: {
    textAlign: 'center',
    color: '#888',
    marginTop: 50,
    fontSize: 15,
  },
  footer: {
    width: '100%',
    backgroundColor: primaryColor,
  },
});

const MobStyles = StyleSheet.create({
  container: {},
  aboutUsText1: {paddingHorizontal: 20},
});

const TabStyles = StyleSheet.create({
  container: {},
  aboutUsText1: {paddingHorizontal: '15%', marginTop: 80},
});

const PcStyles = StyleSheet.create({
  container: {},
  aboutUsText1: {paddingHorizontal: '20%', marginTop: 100},
});
