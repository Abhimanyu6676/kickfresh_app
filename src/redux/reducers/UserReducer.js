import {reduxConstants} from '../ReduxConstants';

const initialState = {
  User: {
    username: 'Abhi103',
    FName: 'Abhimanyu',
    LName: 'Dalal',
    phone: null,
    address: [
      {
        add1: 'T27/1908, ParasTierea',
        add2: 'sector 137, Near Advant Tower',
        city: 'Noida',
        State: 'UP',
        Pincode: '201301',
      },
      {
        add1: 'T16/404, Jaypee WishTown',
        add2: 'sector 127, Near Axis House',
        city: 'Noida',
        State: 'UP',
        Pincode: '201301',
      },
    ],
    email: null,
    Token: null,
  },
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case reduxConstants.USER:
      return action.User;

    default:
      return state;
  }
};
