import {reduxConstants} from '../ReduxConstants';

const initialState = {
  User: {},
  UserAddress: {
    addLine1: '',
  },
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case reduxConstants.USER:
      return {User: action.User, UserAddress: state.UserAddress};

    case reduxConstants.USER_ADDRESS:
      return {User: state.User, UserAddress: action.UserAddress};

    default:
      return state;
  }
};
