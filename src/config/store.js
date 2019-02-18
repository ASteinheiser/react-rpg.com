import { applyMiddleware, createStore, combineReducers, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage                          from 'redux-persist/lib/storage';
import thunk                            from 'redux-thunk';

import appState  from '../features/app-state/reducer';
import player    from '../features/player/reducer';
import dialog    from '../features/dialog-manager/reducer';
import map       from '../features/map/reducer';
import gameMenu  from '../features/game-menus/reducer';
import world     from '../features/world/reducer';
import stats     from '../features/stats/reducer';
import inventory from '../features/inventory/reducer';
import monsters  from '../features/monsters/reducer';
import snackbar  from '../features/snackbar/reducer';

const rootReducer = combineReducers({
  appState,
  player,
  dialog,
  gameMenu,
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
  compose(
    applyMiddleware(thunk),
    process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() || compose
  )
);

export default store;
export const persistor = persistStore(store);
