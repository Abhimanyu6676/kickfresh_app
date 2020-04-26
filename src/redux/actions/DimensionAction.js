import { reduxConstants } from "../ReduxConstants";

export const DimensionAction = Dimension => {
  return {
    type: reduxConstants.DIMENSION,
    Dimension: Dimension
  };
};
