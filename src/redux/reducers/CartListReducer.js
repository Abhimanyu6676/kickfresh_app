import {reduxConstants} from '../ReduxConstants';

const initialState = {
  cartList: [],
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case reduxConstants.CART_LIST:
      return action.cartList;

    default:
      return state;
  }
};
