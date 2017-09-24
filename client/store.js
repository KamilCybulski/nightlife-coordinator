import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import user from './reducers/userReducer';
import bars from './reducers/barsReducer';

export default createStore(
  combineReducers({ user, bars }),
  {},
  applyMiddleware(logger),
);
