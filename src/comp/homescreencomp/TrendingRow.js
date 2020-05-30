import React, {useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import ItemType1 from '../common/itemViews/ItemType1';
import {useQuery} from '@apollo/react-hooks';
import {gql_trendingProducts} from '../../services/gqls';

export default TrendingRow = (props) => {
  const {loading, error, data} = useQuery(gql_trendingProducts);
  _data = [
    {ProductName: 'p1'},
    {ProductName: 'p1'},
    {ProductName: 'p1'},
    {ProductName: 'p1'},
  ];

  if (loading || error)
    return (
      <View style={styles.container}>
        <Text
          style={{
            color: '#aaa',
            fontWeight: 'bold',
            fontSize: 20,
            marginTop: 10,
            marginLeft: 5,
          }}>
          Trending Products
        </Text>

        <View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={_data}
            keyExtractor={(item, index) => 'key' + index}
            renderItem={({item, index}) => {
              return <ItemType1 item={item} dimensions={props.dimensions} />;
            }}
          />
        </View>
      </View>
    );

  return (
    <View style={styles.container}>
      <Text
        style={{
          color: '#aaa',
          fontWeight: 'bold',
          fontSize: 20,
        }}>
        Trending Products
      </Text>

      <View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={data.allProducts}
          keyExtractor={(item, index) => 'key' + index}
          renderItem={({item, index}) => {
            return <ItemType1 item={item} dimensions={props.dimensions} />;
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderWidth: 0,
  },
  head: {
    justifyContent: 'center',
  },
});
