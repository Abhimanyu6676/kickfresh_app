import {gql} from '@apollo/client';
import SubCategory from '../comp/homescreencomp/subcategory/SubCategory';

export const gql_allCatogries = gql`
  {
    allCategories {
      Category
      SubCategory {
        SubCategory
      }
    }
  }
`;

export const gql_trendingProducts = gql`
  {
    allProducts(where: {isTrending_gt: 0}) {
      ProductName
      Price
      Breakqty
      isTrending
      Unit
    }
  }
`;

export const gql_SubCategoryProducts = gql`
  query Products($SubCategory: String!) {
    allProducts(where: {SubCategory: $SubCategory}) {
      ProductName
      Price
      Breakqty
      isTrending
      Unit
    }
  }
`;
