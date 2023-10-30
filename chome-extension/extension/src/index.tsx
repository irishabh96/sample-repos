import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import Store from './store';
import { initialState as auth } from './store/auth';
import { initialState as app } from './store/app';

import './index.css';

const initialState = {
  auth,
  app,
};

ReactDOM.render(
  <Store.Provider initialState={initialState}>
    <App />
  </Store.Provider>,
  document.getElementById('root') as HTMLElement
);
