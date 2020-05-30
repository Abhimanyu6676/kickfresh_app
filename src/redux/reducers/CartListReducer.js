import {reduxConstants} from '../ReduxConstants';
import {client} from '../../Application';
import {gql_resolveCart} from '../../services/gqls';
import {
  cartResolutionTimeAction,
  cartResolvedBooleanAction,
} from '../actions/CartListAction';

const dummyCartList = [
  {
    ProductName: 'Product 1',
    Category: 'Category 1',
    SubCategory: 'Sub Category',
    currQty: 3,
  },
  {
    ProductName: 'Product 2',
    Category: 'Category 1',
    SubCategory: 'Sub Category',
    currQty: 3,
  },
  {
    ProductName: 'Product 3',
    Category: 'Category 1',
    SubCategory: 'Sub Category',
    currQty: 3,
  },
];

const initialState = {
  cartList: [],
  cartResolvedBoolean: false,
  cartResolutionTime: 1111,
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case reduxConstants.CART_LIST:
      return {...state, cartResolvedBoolean: false, cartList: action.cartList};

    case reduxConstants.CART_RESOLUTION_TIME:
      return {
        ...state,
        cartResolutionTime: action.cartResolutionTime,
      };

    case reduxConstants.CART_RESOLVED_BOOLEAN:
      return {...state, cartResolvedBoolean: action.cartResolvedBoolean};

    default:
      return state;
  }
};
