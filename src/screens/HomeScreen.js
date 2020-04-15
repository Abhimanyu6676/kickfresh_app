import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FlatRow from '../comp/FlatRow';
import {cartListAction} from '../redux/actions/CartListAction';
import {connect} from 'react-redux';
import {useFocusEffect} from '@react-navigation/core';

const Homescreen = () => {
  useFocusEffect(() => {
    /* let debug = true;

    {
      debug && console.log(props.istate);
    } */
  });
  return (
    <View style={styles.container}>
      <FlatRow /* cartList={cartList} */ />
    </View>
  );
};

Homescreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default HomeScreen = connect((state) => ({istate: state}))(Homescreen);
