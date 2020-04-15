import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import ItemType1 from './ItemType1';

let list = [
  {Timer: true},
  {Timer: true},
  {Timer: false},
  {Timer: false},
  {Timer: false},
];

const FlatRow = props => {
  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Text style={styles.headText}>Essentials</Text>
      </View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={list}
        keyExtractor={(item, index) => 'key' + index}
        renderItem={({item, index}) => {
          return <ItemType1 item={item} />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    borderWidth: 1,
  },
  head: {
    justifyContent: 'center',
    borderWidth: 1,
  },
  headText: {
    transform: [{rotate: '90deg'}],
    margin: 0,
    padding: 0,
    fontSize: 20,
    borderWidth: 1,
  },
});

export default FlatRow;
