import {reduxConstants} from '../ReduxConstants';

const initialState = {
  cartList: [
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
  ],
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case reduxConstants.CART_LIST:
      return action.cartList;

    default:
      return state;
  }
};
