import { reduxConstants } from "../ReduxConstants";

const initialState = {
  Dimension: { window: 0, screen: 0 }
};

export const DimensionReducer = (state = initialState, action) => {
  switch (action.type) {
    case reduxConstants.DIMENSION:
      return action.Dimension;

    default:
      return state;
  }
};
