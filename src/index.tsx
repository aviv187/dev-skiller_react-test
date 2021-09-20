import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { createStore } from 'redux'
import { Provider } from 'react-redux';
import { products } from './redux/products';
import { combineReducers } from 'redux'

const store = createStore(combineReducers({ products }))

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

