import { createStore, combineReducers } from 'redux';

import user from './reducers/userReducer';
import bars from './reducers/barsReducer';

export default createStore(combineReducers({ user, bars }));
