import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage                          from 'redux-persist/lib/storage';

import player    from '../features/player/reducer';
import map       from '../features/map/reducer';
import world     from '../features/world/reducer';
import stats     from '../features/stats/reducer';
import inventory from '../features/inventory/reducer';
import monsters  from '../features/monsters/reducer';
import snackbar  from '../features/snackbar/reducer';

const rootReducer = combineReducers({
  player,
  map,
  world,
  stats,
  inventory,
  monsters,
  snackbar
});

const persistConfig = {
  key: 'root',
  storage: storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;
export let persistor = persistStore(store);
