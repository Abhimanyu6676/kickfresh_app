import { createStore } from "redux";
import { cartReducer } from "./reducers/CartListReducer";

export const store = createStore(cartReducer);
