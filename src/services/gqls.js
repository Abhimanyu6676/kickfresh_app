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
      Category
      SubCategory
      Price
      MRP
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
      Category
      SubCategory
      Price
      MRP
      Breakqty
      isTrending
      Unit
    }
  }
`;

export const gql_SearchProducts = gql`
  query Products($ProductName: String!) {
    allProducts(where: {ProductName_contains: $ProductName}, first: 10) {
      ProductName
      Category
      SubCategory
      MRP
      Price
      Breakqty
      isTrending
      Unit
    }
  }
`;

export const gql_signIN = gql`
  mutation signin($username: String, $pass: String) {
    authenticate: authenticateUserWithPassword(
      username: $username
      password: $pass
    ) {
      token
      item {
        id
        username
        FName
        LName
        Address
        isAdmin
      }
    }
  }
`;

export const gql_getAllAddress = gql`
  query($id: ID!) {
    User(where: {id: $id}) {
      username
      defaultAddress
      Address {
        id
        addLine1
        addLine2
        addRef
        city
        state
        Pincode
        isDefault
      }
    }
  }
`;

export const gql_updateAddress = gql`
  mutation updateAddress(
    $id: ID!
    $addLine1: String!
    $addLine2: String!
    $addRef: String!
    $city: String!
    $state: String!
    $isDefault: Boolean!
  ) {
    updateAddress(
      id: $id
      data: {
        addLine1: $addLine1
        addLine2: $addLine2
        addRef: $addRef
        city: $city
        state: $state
        isDefault: $isDefault
      }
    ) {
      id
      addLine1
      addLine2
      addRef
      city
      state
      Pincode
      isDefault
    }
  }
`;

export const gql_deleteAddress = gql`
  mutation deleteAddress($id: ID!) {
    deleteAddress(id: $id) {
      id
      addLine1
      addLine2
      addRef
      city
      state
      User {
        id
        username
      }
    }
  }
`;

export const gql_updateDefaultAddress = gql`
  mutation updateAddress($id: ID!, $defaultAddress: String!) {
    updateUser(id: $id, data: {defaultAddress: $defaultAddress}) {
      id
      defaultAddress
      username
    }
  }
`;

export const gql_getUser = gql`
  query($id: ID!) {
    User(where: {id: $id}) {
      id
      username
      FName
      LName
      email
      defaultAddress
    }
  }
`;

export const gql_addAddress = gql`
  mutation createAddress(
    $id: ID!
    $addLine1: String!
    $addLine2: String!
    $addRef: String!
    $city: String!
    $state: String!
    $isDefault: Boolean!
  ) {
    createAddress(
      data: {
        addLine1: $addLine1
        addLine2: $addLine2
        addRef: $addRef
        city: $city
        state: $state
        isDefault: $isDefault
        User: {connect: {id: $id}}
      }
    ) {
      id
    }
  }
`;

export const gql_createSubscriber = gql`
  mutation createSubscribersList($email: String!) {
    createSubscribersList(data: {email: $email}) {
      email
    }
  }
`;
