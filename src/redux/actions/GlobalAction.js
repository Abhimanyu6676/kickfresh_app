import {reduxConstants} from '../ReduxConstants';

export const showLocationDialogAction = ({showLocationDialog}) => {
  return {
    type: reduxConstants.SHOW_LOCATION_DIALOG,
    showLocationDialog: showLocationDialog,
  };
};

export const cityAction = ({currentLocation}) => {
  return {
    type: reduxConstants.LOCATION_CITY,
    currentLocation: currentLocation,
  };
};

export const cartasDialogAction = ({showCartasDialog}) => {
  return {
    type: reduxConstants.SHOW_CART_AS_DIALOG,
    showCartasDialog: showCartasDialog,
  };
};

export const regionAction = ({currentRegion}) => {
  return {
    type: reduxConstants.LOCATION_REGION,
    currentRegion: currentRegion,
  };
};
