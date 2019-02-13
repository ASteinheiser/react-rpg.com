import store from '../config/store';

export default function resetGameState() {

  store.dispatch({
    type: 'RESET',
    payload: {}
  });

  store.dispatch({
    type: 'PAUSE',
    payload: {
      pause: true,
      gameStart: true
    }
  });
}
