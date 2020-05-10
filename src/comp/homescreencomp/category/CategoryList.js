import React, { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import Category from "./Category";
//-->GQL Imports
import { useQuery } from "@apollo/client";
import { gql_allCatogries } from "../../../services/gqls";

const CategoryList = (props) => {
  const { loading, error, data } = useQuery(gql_allCatogries);
  const _data = [
    {
      Category: "Loading...",
      SubCategory: [],
    },
    {
      Category: "Category...",
      SubCategory: [],
    },
  ];

  useEffect(() => {
    //effect
    return () => {
      //cleanup
    };
  });

  if (loading || error)
    return (
      <View
        style={[
          ComStyles.container,
          props.dimensions.window.width < 500
            ? MobStyles.container
            : PcStyles.container,
        ]}
      >
        <Category
          data={_data}
          dimensions={props.dimensions}
          navigation={props.navigation}
        />
      </View>
    );

  return (
    <View
      style={[
        ComStyles.container,
        props.dimensions.window.width < 500
          ? MobStyles.container
          : PcStyles.container,
      ]}
    >
      <Category
        data={data.allCategories}
        dimensions={props.dimensions}
        navigation={props.navigation}
      />
    </View>
  );
};

export default CategoryList;

const ComStyles = StyleSheet.create({
  container: { marginBottom: 10 },
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
