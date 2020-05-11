import {reduxConstants} from '../ReduxConstants';

export const showLocationDialogAction = (showLocationDialog) => {
  return {
    type: reduxConstants.SHOW_LOCATION_DIALOG,
    showLocationDialog: showLocationDialog,
  };
};

export const cityAction = (currentLocation) => {
  return {
    type: reduxConstants.LOCATION_CITY,
    currentLocation: currentLocation,
  };
};
