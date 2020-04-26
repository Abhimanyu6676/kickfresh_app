import React, {useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Category from './Category';
//-->GQL Imports
import {useQuery} from '@apollo/client';
import {gql_allCatogries} from '../../../services/gqls';

const CategoryList = (props) => {
  const {loading, error, data} = useQuery(gql_allCatogries);

  useEffect(() => {
    //effect

    return () => {
      //cleanup
    };
  });

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
    <Category
      data={data.allCategories}
      dimensions={props.dimensions}
      navigation={props.navigation}
    />
  );
};

export default CategoryList;

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
  container: {},
});
