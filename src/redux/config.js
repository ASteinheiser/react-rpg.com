import { createStore, combineReducers } from 'redux';

import player from '../features/player/reducer';

const rootReducer = combineReducers({
  player,
});

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;
