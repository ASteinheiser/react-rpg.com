
export default function resetGameState() {
  return dispatch => {

    dispatch({
      type: 'RESET',
      payload: null
    });

    dispatch({
      type: 'PAUSE',
      payload: {
        pause: true,
        gameStart: true
      }
    });
  };
}
