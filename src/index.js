import React, { Component } from 'react';
import ReactDOM             from 'react-dom';
import { Provider }         from 'react-redux';
import { PersistGate }      from 'redux-persist/integration/react';
import ReactGA              from 'react-ga';

import store, { persistor } from './config/store';
import App                  from './App';
import Spinner              from './components/spinner';

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

if(process.env.REACT_APP_GOOGLE_ANALYTICS) {
  console.info('reporting page view to Google Analytics...');
  ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS);
  ReactGA.pageview('/');
}

class ConnectedApp extends Component {

  // refresh the local storage in case the redux store structure is old
  componentDidCatch() {
    localStorage.clear();
    window.location.reload();
  }

  render() {
    return(
      <Provider store={store}>
        <PersistGate
          loading={<Spinner />}
          persistor={persistor}>

          <App />

        </PersistGate>
      </Provider>
    );
  }
}

ReactDOM.render(<ConnectedApp />, document.getElementById('react-rpg'));
