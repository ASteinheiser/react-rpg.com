import React           from 'react';
import ReactDOM        from 'react-dom';
import { Provider }    from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

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

const ConnectedApp = () => (
  <Provider store={store}>
    <PersistGate
      loading={<Spinner />}
      persistor={persistor}>

      <App />

    </PersistGate>
  </Provider>
);

ReactDOM.render(<ConnectedApp />, document.getElementById('react-rpg'));
