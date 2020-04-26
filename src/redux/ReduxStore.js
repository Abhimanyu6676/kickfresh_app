import { createStore, combineReducers } from "redux";
import { cartReducer } from "./reducers/CartListReducer";
import { DimensionReducer } from "./reducers/DimensionReducer";

const allReducers = combineReducers({
  cartReducer,
  DimensionReducer
});
export const store = createStore(allReducers);
