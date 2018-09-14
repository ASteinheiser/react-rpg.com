import store from '../config/store';

export default function resetGameState() {
  store.dispatch({
    type: 'RESET',
    payload: {}
  })
}
