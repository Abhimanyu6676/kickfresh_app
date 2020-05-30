import {gql} from 'apollo-boost';
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
      id
      ProductName
      ProductID
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
      id
      ProductName
      ProductID
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
      id
      ProductName
      ProductID
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
        city {
          Location
          State
        }
      }
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

export const gql_deleteAddress = gql`
  mutation deleteAddress($id: ID!) {
    deleteAddress(id: $id) {
      id
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

export const gql_updateAddress = gql`
  mutation updateAddress(
    $addID: ID!
    $locationID: ID!
    $addLine1: String!
    $addLine2: String!
    $addRef: String!
    $region: String
    $isDefault: Boolean
  ) {
    updateAddress(
      id: $addID
      data: {
        addLine1: $addLine1
        addLine2: $addLine2
        addRef: $addRef
        city: {connect: {id: $locationID}}
        region: $region
        isDefault: $isDefault
      }
    ) {
      id
    }
  }
`;

export const gql_addAddress = gql`
  mutation createAddress(
    $userID: ID!
    $locationID: ID!
    $addLine1: String!
    $addLine2: String!
    $addRef: String!
    $region: String
    $isDefault: Boolean
  ) {
    createAddress(
      data: {
        addLine1: $addLine1
        addLine2: $addLine2
        addRef: $addRef
        city: {connect: {id: $locationID}}
        region: $region
        isDefault: $isDefault
        User: {connect: {id: $userID}}
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

export const gql_resolveCart = gql`
  query($products: [cartResolverInput!]!) {
    cartResolver(products: $products, userID: $userID) {
      Products {
        ProductName
        ProductID
        Category
        SubCategory
        Price
        MRP
        Breakqty
        isTrending
        Unit
        modified
      }
      success
    }
  }
`;

export const gql_getLocations = gql`
  query {
    allLocations {
      id
      Location
      Region {
        id
        Region
      }
    }
  }
`;
