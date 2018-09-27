import React        from 'react';
import ReactDOM     from 'react-dom';
import { Provider } from 'react-redux';

import store from './config/store';
import App   from './App';

import './index.css';

// supresses enormous amount of console.logs
/* global soundManager:false */
import 'react-sound';
soundManager.setup({ debugMode: false });

ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('root'));
