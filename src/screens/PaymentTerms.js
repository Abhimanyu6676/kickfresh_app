import React from 'react';
import {View, Text, Image, Dimensions, ScrollView} from 'react-native';
import {server2} from '../services/REST';
import {Footer} from '../comp/homescreencomp/Footer';
import {primaryColor} from '../../assets/theme/global_colors';

const window = Dimensions.get('window');

export default PaymentTerms = (props) => {
  return (
    <ScrollView>
      <View
        style={[
          ComStyles.container,
          window.width < 500 ? MobStyles.container : PcStyles.container,
        ]}>
        {/*//Sec1: 'ContentSection' */}
        <View
          style={[
            ComStyles.contentView,
            window.width < 500 ? MobStyles.contentView : PcStyles.contentView,
          ]}>
          <Text style={ComStyles.HeadingText}>Payment Terms</Text>
          <Text style={ComStyles.subHeadingText}></Text>
          <Text style={ComStyles.HeadingText}>FreshKick</Text>
          <Text style={ComStyles.subHeadingText}>
            Sternet Industries India Pvt. Ltd.
          </Text>
          <Text style={ComStyles.contentText}>
            1908, T-27, Paras Tierea, Sector-137
          </Text>
          <Text style={ComStyles.contentText}>Noida -201305</Text>
        </View>
        {/*//Sec2: 'FooterSection' */}
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

const ComStyles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderWidth: 0,
    width: '100%',
    minHeight: window.height - 60,
    display: 'flex',
    flexDirection: 'column',
  },
  contentView: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
    paddingBottom: 30,
  },
  footer: {
    width: '100%',
    backgroundColor: primaryColor,
  },
  HeadingText: {color: '#444', fontSize: 25, fontWeight: 'bold'},
  subHeadingText: {
    color: '#777',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  contentText: {color: '#777', fontSize: 15, marginTop: 10},
});

const MobStyles = StyleSheet.create({
  container: {},
  contentView: {paddingHorizontal: 20},
});

const TabStyles = StyleSheet.create({
  container: {},
  contentView: {paddingHorizontal: '15%'},
});

const PcStyles = StyleSheet.create({
  container: {},
  contentView: {paddingHorizontal: '20%'},
});
