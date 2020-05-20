import {createStore, combineReducers} from 'redux';
import {cartReducer} from './reducers/CartListReducer';
import {userReducer} from './reducers/UserReducer';
import {globalReducer} from './reducers/GlobalReducer';

const allReducers = combineReducers({
  cartReducer,
  userReducer,
  globalReducer,
});
export const store = createStore(allReducers);
