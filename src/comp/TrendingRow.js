import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import ItemType1 from './common/itemViews/ItemType1';
import {useQuery} from '@apollo/client';
import {gql_trendingProducts} from '../services/gqls';

export default TrendingRow = (props) => {
  const {loading, error, data} = useQuery(gql_trendingProducts);

  if (loading)
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  if (error)
    return (
      <View>
        <Text>{JSON.stringify(error.message)}</Text>
      </View>
    );
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
          data={data.allProducts}
          keyExtractor={(item, index) => 'key' + index}
          renderItem={({item, index}) => {
            return <ItemType1 item={item} />;
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
    marginLeft: 0,
  },
  head: {
    justifyContent: 'center',
    borderWidth: 0,
  },
});
