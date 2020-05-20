import {reduxConstants} from '../ReduxConstants';

const initialState = {
  showLocationDialog: false,
  currentLocation: null,
  showCartasDialog: false,
};

export const globalReducer = (state = initialState, action) => {
  switch (action.type) {
    case reduxConstants.SHOW_LOCATION_DIALOG:
      return {
        currentLocation: state.currentLocation,
        showLocationDialog: action.showLocationDialog,
        showCartasDialog: state.showCartasDialog,
      };

    case reduxConstants.LOCATION_CITY:
      return {
        showLocationDialog: state.showLocationDialog,
        currentLocation: action.currentLocation,
        showCartasDialog: state.showCartasDialog,
      };

    case reduxConstants.SHOW_CART_AS_DIALOG:
      console.log(action.showCartasDialog);
      return {
        showLocationDialog: state.showLocationDialog,
        currentLocation: state.currentLocation,
        showCartasDialog: action.showCartasDialog,
      };

    default:
      return state;
  }
};

// return {User: action.User, UserAddress: state.UserAddress};
