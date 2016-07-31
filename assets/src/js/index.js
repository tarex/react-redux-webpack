import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { DevTools } from 'components';
import Router from './router';
import configureStore from './store';
const store = configureStore();
const documentRoot = document.getElementById('root');
render(
  <Provider store={store}>
    <div>
      <DevTools />
      <Router />
    </div>
  </Provider>,
  documentRoot);
