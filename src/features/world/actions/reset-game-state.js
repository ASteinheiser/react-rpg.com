
export default function resetGameState() {
  return dispatch => {
    dispatch({
      type: 'RESET',
      payload: {}
    });

    dispatch({
      type: 'PAUSE',
      payload: {
        pause: true,
        gameStart: true
      }
    });
  }
}
