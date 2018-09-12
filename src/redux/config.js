import { createStore, combineReducers } from 'redux';

import player from '../features/player/reducer';
import map    from '../features/map/reducer';
import world  from '../features/world/reducer';

const rootReducer = combineReducers({
  player,
  map,
  world,
});

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;
