import React        from 'react';
import ReactDOM     from 'react-dom';
import { Provider } from 'react-redux';

import store from './config/store';
import App   from './App';

// import fonts
import 'typeface-roboto';
import 'typeface-montserrat';

import './index.scss';

// supresses enormous amount of console.logs
/* global soundManager:false */
import 'react-sound';

soundManager.setup({
  debugMode: false,
  ignoreMobileRestrictions: true
});

ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('root'));
