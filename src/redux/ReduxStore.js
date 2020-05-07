import {createStore, combineReducers} from 'redux';
import {cartReducer} from './reducers/CartListReducer';
import {userReducer} from './reducers/UserReducer';

const allReducers = combineReducers({
  cartReducer,
  userReducer,
});
export const store = createStore(allReducers);
