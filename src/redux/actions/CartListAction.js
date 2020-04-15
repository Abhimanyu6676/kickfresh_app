import {reduxConstants} from '../ReduxConstants';

export const cartListAction = cartList => {
  return {
    type: reduxConstants.CART_LIST,
    cartList: cartList,
  };
};
