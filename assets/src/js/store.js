import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { DevTools } from 'components';
import * as reducers from 'modules';

const reducer = combineReducers({ ...reducers });
const middleware = [thunk]; // add more middleware here
const createStoreWithMiddleware = compose(
  applyMiddleware(...middleware),
  DevTools.instrument(), // need to change for production mode
)(createStore);

export default createStoreWithMiddleware(reducer);
