import {reduxConstants} from '../ReduxConstants';

const initialState = {
  showLocationDialog: false,
  currentLocation: null,
};

export const locationReducer = (state = initialState, action) => {
  switch (action.type) {
    case reduxConstants.SHOW_LOCATION_DIALOG:
      return action.showLocationDialog;

    case reduxConstants.LOCATION_CITY:
      return action.currentLocation;

    default:
      return state;
  }
};
