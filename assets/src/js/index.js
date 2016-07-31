import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { DevTools } from 'components';
import Router from './router';
import Store from './store';

const documentRoot = document.getElementById('root');
render(
  <Provider store={Store}>
    <div>
      <DevTools />
      <Router />
    </div>
  </Provider>,
  documentRoot);
