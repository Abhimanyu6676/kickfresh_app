import {reduxConstants} from '../ReduxConstants';

const initialState = {
  currentLocation: null,
  currentRegion: null,
  showLocationDialog: false,
  showCartasDialog: false,
};

export const globalReducer = (state = initialState, action) => {
  switch (action.type) {
    case reduxConstants.SHOW_LOCATION_DIALOG:
      return {
        ...state,
        showLocationDialog: action.showLocationDialog,
      };

    case reduxConstants.SHOW_CART_AS_DIALOG:
      console.log(action.showCartasDialog);
      return {
        ...state,
        showCartasDialog: action.showCartasDialog,
      };

    case reduxConstants.LOCATION_CITY:
      ///save to storage and retrieve on start
      return {
        ...state,
        currentLocation: action.currentLocation,
      };

    case reduxConstants.LOCATION_REGION:
      ///save to storage and retrieve on start
      console.log('====' + action.currentRegion);
      return {
        ...state,
        currentRegion: action.currentRegion,
      };

    default:
      return state;
  }
};

// return {User: action.User, UserAddress: state.UserAddress};
