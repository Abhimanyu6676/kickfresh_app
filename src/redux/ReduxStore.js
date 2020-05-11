import {createStore, combineReducers} from 'redux';
import {cartReducer} from './reducers/CartListReducer';
import {userReducer} from './reducers/UserReducer';
import {locationReducer} from './reducers/LocationReducer';

const allReducers = combineReducers({
  cartReducer,
  userReducer,
  locationReducer,
});
export const store = createStore(allReducers);
