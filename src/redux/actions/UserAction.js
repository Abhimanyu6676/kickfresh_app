import {reduxConstants} from '../ReduxConstants';

export const UserAction = (User) => {
  return {
    type: reduxConstants.USER,
    User: User,
  };
};

export const UserAddressAction = (UserAddress) => {
  return {
    type: reduxConstants.USER_ADDRESS,
    UserAddress: UserAddress,
  };
};
