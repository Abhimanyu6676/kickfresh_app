import {reduxConstants} from '../ReduxConstants';

export const cartListAction = ({cartList}) => {
  return {
    type: reduxConstants.CART_LIST,
    cartList: cartList,
  };
};

export const cartResolutionTimeAction = ({cartResolutionTime}) => {
  return {
    type: reduxConstants.CART_RESOLUTION_TIME,
    cartResolutionTime: cartResolutionTime,
  };
};

export const cartResolvedBooleanAction = ({cartResolvedBoolean}) => {
  return {
    type: reduxConstants.CART_RESOLVED_BOOLEAN,
    cartResolvedBoolean: cartResolvedBoolean,
  };
};
