import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  Platform,
} from 'react-native';
import TrendingRow from './TrendingRow';
import {connect, useSelector} from 'react-redux';
//import { useFocusEffect } from "@react-navigation/core";
import BannerRow from './BannerRow';
import CategoryList from './category/CategoryList';
import SearchBar from '../common/SearchBar';
import {Footer} from './Footer';
import {
  primaryColor,
  secondaryColor,
} from '../../../assets/theme/global_colors';
import LocationDialog from '../common/LocationDialog';
import CartScreen from '../../screens/CartScreen';
import {getForCartDialog} from '../../services/HelperFunctions';

const window = Dimensions.get('window');
const screen = Dimensions.get('screen');

export default HomeScreen = (props) => {
  const [dimensions, setDimensions] = useState({window, screen});
  const showLocationDialog = useSelector(
    (state) => state.globalReducer.showLocationDialog,
  );
  const showCartasDialog = useSelector(
    (state) => state.globalReducer.showCartasDialog,
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
    <ScrollView style={{backgroundColor: '#fff'}} ref={props.route.params.ref}>
      {showLocationDialog && <LocationDialog />}
      {Platform.OS == 'web' &&
        dimensions.window.width > 800 &&
        showCartasDialog && (
          <View
            style={{
              position: 'absolute',
              right: 0,
              zIndex: 50,
              width: 500,
            }}>
            <CartScreen />
          </View>
        )}
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
        <View
          style={[
            ComStyles.Banner,
            dimensions.window.width < 500 ? MobStyles.Banner : PcStyles.Banner,
          ]}>
          <BannerRow navigation={props.navigation} dimensions={dimensions} />
        </View>
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

HomeScreen.navigationOptions = {
  header: null,
};

const ComStyles = StyleSheet.create({
  container: {
    borderWidth: 0,
  },
  Banner: {},
  TrendingRow: {borderWidth: 0, marginTop: 20},
  CategoryList: {},
  SearchBar: {backgroundColor: primaryColor},
  Footer: {backgroundColor: primaryColor, marginTop: 20},
});

const MobStyles = StyleSheet.create({
  container: {},
  Banner: {},
  TrendingRow: {marginHorizontal: '2%'},
  CategoryList: {marginHorizontal: '2%'},
  SearchBar: {
    width: '100%',
  },
  Footer: {},
});

const TabStyles = StyleSheet.create({
  container: {},
  Banner: {},
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
  Banner: {marginHorizontal: '10%', borderWidth: 0},
  TrendingRow: {marginHorizontal: '10%'},
  CategoryList: {marginHorizontal: '10%'},
  SearchBar: {
    paddingHorizontal: 200,
    maxHeight: 70,
    zIndex: 40,
  },
  Footer: {width: '100%', paddingHorizontal: 50},
});
