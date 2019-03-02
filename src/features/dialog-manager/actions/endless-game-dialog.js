
export default function endlessGameDialog() {
  return dispatch => {

    dispatch({
      type: 'PAUSE',
      payload: {
        pause: true,
        gameStart: true,
        gameSelect: 'endless'
      }
    });
  };
}