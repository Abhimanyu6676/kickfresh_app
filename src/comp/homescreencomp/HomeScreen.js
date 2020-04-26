import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Dimensions, ScrollView} from 'react-native';
import TrendingRow from '../TrendingRow';
import {connect} from 'react-redux';
//import { useFocusEffect } from "@react-navigation/core";
import BannerRow from '../BannerRow';
import CategoryList from './category/CategoryList';

const window = Dimensions.get('window');
const screen = Dimensions.get('screen');

const Homescreen = (props) => {
  const [dimensions, setDimensions] = useState({window, screen});

  props.navigation.setOptions({headerShown: false});

  const onDimensionChange = ({window, screen}) => {
    setDimensions({window, screen});
  };

  useEffect(() => {
    Dimensions.addEventListener('change', onDimensionChange);
    return () => {
      Dimensions.removeEventListener('change', onDimensionChange);
    };
  });
  return (
    <ScrollView style={{backgroundColor: '#fff'}}>
      <View
        style={[
          dimensions.window.width < 500
            ? MobStyles.container
            : PcStyles.container,
          ComStyles.container,
        ]}>
        {/*PLACE: USP_BAR  */}
        <BannerRow navigation={props.navigation} />
        <TrendingRow navigation={props.navigation} />
        <CategoryList navigation={props.navigation} dimensions={dimensions} />
      </View>
    </ScrollView>
  );
};

Homescreen.navigationOptions = {
  header: null,
};

const ComStyles = StyleSheet.create({
  container: {
    borderWidth: 0,
  },
});

const MobStyles = StyleSheet.create({
  container: {},
});

const TabStyles = StyleSheet.create({
  container: {},
});

const PcStyles = StyleSheet.create({
  container: {marginHorizontal: 50},
});

export default HomeScreen = connect((state) => ({
  istate: state.cartReducer.cartList,
}))(Homescreen);
