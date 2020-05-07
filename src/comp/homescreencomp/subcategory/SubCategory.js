import React, {useEffect} from 'react';
import {Text, View, ScrollView, FlatList, BackHandler} from 'react-native';
import GridView from 'react-native-super-grid';
import ItemType1 from '../../common/itemViews/ItemType1';
import {TouchableOpacity} from 'react-native-gesture-handler';
//-->GQL Imports
import {useQuery} from '@apollo/client';
import {gql_SubCategoryProducts} from '../../../services/gqls';

export default SubCategory = (props) => {
  const {CategoryList, SubCategory, dimensions} = props.route.params;
  const {loading, error, data} = useQuery(gql_SubCategoryProducts, {
    variables: {SubCategory: SubCategory.SubCategory},
  });

  props.navigation.setOptions({
    headerStyle: {
      height: 60,
      borderWidth: 0,
    },
    headerTitle: () => (
      <View
        style={{
          width: '100%',
          paddingRight: 100,
          borderWidth: 0,
        }}>
        <ScrollView horizontal>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={CategoryList}
            keyExtractor={(item, index) => 'key' + index}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  style={{paddingVertical: 10}}
                  onPress={() => {
                    console.log(JSON.stringify(item.SubCategory));
                    props.navigation.replace('SubCategory', {
                      SubCategory: {SubCategory: item.SubCategory},
                      CategoryList: CategoryList,
                      dimensions: {dimensions},
                    });
                  }}>
                  <Text
                    style={{
                      color: '#aaa',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      padding: 10,
                    }}>
                    {item.SubCategory}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </ScrollView>
      </View>
    ),
  });

  const handleBackPress = () => {
    console.log('go back');
    //this.goBack(); // works best when the goBack is async
    return true;
  };

  useEffect(() => {
    //effect
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress,
    );
    return () => {
      //cleanup
      backHandler.remove();
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
    <View
      style={{
        backgroundColor: '#fff',
        borderWidth: 0,
        height: '100%',
      }}>
      {/* <Text>{props.route.params.SubCategory.SubCategory}</Text> */}
      <GridView
        itemDimension={160}
        items={data.allProducts}
        spacing={10}
        style={{flex: 1}}
        renderItem={(item, index) => (
          <ItemType1 item={item.item} dimensions={dimensions} />
        )}
      />
    </View>
  );
};
