import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Dimensions, ScrollView} from 'react-native';
import TrendingRow from './TrendingRow';
import {connect} from 'react-redux';
//import { useFocusEffect } from "@react-navigation/core";
import BannerRow from './BannerRow';
import CategoryList from './category/CategoryList';
import SearchBar from '../common/SearchBar';
import {Footer} from './Footer';

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
        <BannerRow navigation={props.navigation} dimensions={dimensions} />
        <View
          style={[
            ComStyles.TrendingRow,
            dimensions.window.width < 500
              ? MobStyles.TrendingRow
              : PcStyles.TrendingRow,
          ]}>
          <TrendingRow navigation={props.navigation} dimensions={dimensions} />
        </View>
        <View
          style={[
            ComStyles.SearchBar,
            dimensions.window.width < 500
              ? MobStyles.SearchBar
              : PcStyles.SearchBar,
          ]}>
          <SearchBar dimensions={dimensions} />
        </View>
        <View
          style={[
            ComStyles.CategoryList,
            dimensions.window.width < 500
              ? MobStyles.CategoryList
              : PcStyles.CategoryList,
          ]}>
          <CategoryList navigation={props.navigation} dimensions={dimensions} />
        </View>
        <View
          style={[
            ComStyles.Footer,
            dimensions.window.width < 500 ? MobStyles.Footer : PcStyles.Footer,
          ]}>
          <Footer dimensions={dimensions} />
        </View>
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
  TrendingRow: {borderWidth: 0},
  CategoryList: {},
  SearchBar: {},
  Footer: {backgroundColor: '#0E6655', width: '100%', marginTop: 20},
});

const MobStyles = StyleSheet.create({
  container: {},
  TrendingRow: {padding: 15},
  CategoryList: {marginHorizontal: 8},
  SearchBar: {marginHorizontal: 8, borderRadius: 5, overflow: 'hidden'},
  Footer: {},
});

const TabStyles = StyleSheet.create({
  container: {},
  TrendingRow: {},
  CategoryList: {},
  SearchBar: {},
  Footer: {},
});

const PcStyles = StyleSheet.create({
  container: {},
  TrendingRow: {marginHorizontal: 50},
  CategoryList: {marginHorizontal: 50},
  SearchBar: {marginHorizontal: 50},
  Footer: {width: '100%', paddingHorizontal: 50},
});

export default HomeScreen = connect((state) => ({
  istate: state.cartReducer.cartList,
}))(Homescreen);
