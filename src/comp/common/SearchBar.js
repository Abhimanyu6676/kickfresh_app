import React, {useState} from 'react';
import {View, Text, TextInput, ScrollView} from 'react-native';
import {Row, Form, Item, Input} from 'native-base';
import {useQuery} from '@apollo/client';
import {gql_SearchProducts} from '../../services/gqls';

export default SearchBar = (props) => {
  const [keyword, setkeyword] = useState('');
  const {loading, error, data} = useQuery(gql_SearchProducts, {
    variables: {ProductName: keyword},
  });

  return (
    <View
      style={[
        ComStyles.container,
        props.dimensions.window.width < 500
          ? MobStyles.container
          : PcStyles.container,
      ]}>
      <View style={{flexDirection: 'row', padding: 2}}>
        <View style={{flex: 1}}>
          <Form>
            <Item>
              <Input
                placeholder="Search Products"
                style={[
                  ComStyles.SearchText,
                  {height: 40, borderWidth: 0, flex: 1},
                ]}
                onChangeText={(text) => setkeyword(text)}
              />
            </Item>
          </Form>
        </View>
        <View
          style={{
            height: '100%',
            paddingHorizontal: 8,
          }}>
          {/*  <Icon name="search" style={[ComStyles.SearchIcon, {paddingTop: 6}]} /> */}
        </View>
      </View>
      {data && keyword != '' && (
        <ScrollView
          style={{minHeight: 50, maxHeight: 200, backgroundColor: '#fff'}}>
          {data.allProducts.map((item, index) => {
            return <SearchItem item={item} dimensions={props.dimensions} />;
          })}
        </ScrollView>
      )}
    </View>
  );
};

import {StyleSheet} from 'react-native';
import SearchItem from './itemViews/SearchItem';

const ComStyles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderWidth: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
    marginVertical: 15,
    marginHorizontal: 3,
  },
  SearchText: {
    color: '#aaa',
    justifyContent: 'center',
    fontSize: 15,
    flex: 1,
    paddingHorizontal: 8,
  },
  SearchIcon: {
    color: '#7a0',
    position: 'absolute',
    alignSelf: 'flex-end',
    justifyContent: 'center',
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
