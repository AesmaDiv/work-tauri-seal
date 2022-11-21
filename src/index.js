import React from 'react';
import ReactDOM from 'react-dom/client';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import './index.css';
import App from './App';

import { rootReducer } from './redux/rootReducer';


const store = createStore(rootReducer);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider data={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
