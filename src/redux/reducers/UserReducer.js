import {reduxConstants} from '../ReduxConstants';

const initialState = {
  User: {username: null, Phone: null, Address: [], Email: null, Token: null},
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case reduxConstants.USER:
      return action.User;

    default:
      return state;
  }
};
