import {reduxConstants} from '../ReduxConstants';

export const UserAction = (User) => {
  return {
    type: reduxConstants.USER,
    User: User,
  };
};
