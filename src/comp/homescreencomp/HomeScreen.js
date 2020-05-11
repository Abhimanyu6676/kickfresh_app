import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Dimensions, ScrollView} from 'react-native';
import TrendingRow from './TrendingRow';
import {connect, useSelector} from 'react-redux';
//import { useFocusEffect } from "@react-navigation/core";
import BannerRow from './BannerRow';
import CategoryList from './category/CategoryList';
import SearchBar from '../common/SearchBar';
import {Footer} from './Footer';
import {primaryColor} from '../../../assets/theme/global_colors';
import LocationDialog from '../common/LocationDialog';

const window = Dimensions.get('window');
const screen = Dimensions.get('screen');

const Homescreen = (props) => {
  const [dimensions, setDimensions] = useState({window, screen});
  const showLocationDialog = useSelector(
    (state) => state.locationReducer.showLocationDialog,
  );

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
    <ScrollView style={{backgroundColor: '#fff', top: -2}}>
      {showLocationDialog && <LocationDialog />}
      <View
        style={[
          ComStyles.SearchBar,
          dimensions.window.width < 500
            ? MobStyles.SearchBar
            : dimensions.window.width < 1000
            ? TabStyles.SearchBar
            : PcStyles.SearchBar,
        ]}>
        <SearchBar dimensions={dimensions} />
      </View>
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
          <Footer navigation={props.navigation} dimensions={dimensions} />
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
  SearchBar: {backgroundColor: primaryColor},
  Footer: {backgroundColor: primaryColor, marginTop: 20},
});

const MobStyles = StyleSheet.create({
  container: {},
  TrendingRow: {padding: 15},
  CategoryList: {marginHorizontal: 8},
  SearchBar: {
    width: '100%',
  },
  Footer: {},
});

const TabStyles = StyleSheet.create({
  container: {},
  TrendingRow: {},
  CategoryList: {},
  SearchBar: {
    paddingHorizontal: 50,
    width: '100%',
  },
  Footer: {},
});

const PcStyles = StyleSheet.create({
  container: {},
  TrendingRow: {marginHorizontal: 50},
  CategoryList: {marginHorizontal: 50},
  SearchBar: {
    paddingHorizontal: 200,
    maxHeight: 70,
    zIndex: 40,
  },
  Footer: {width: '100%', paddingHorizontal: 50},
});

export default HomeScreen = connect((state) => ({
  istate: state.cartReducer.cartList,
}))(Homescreen);
