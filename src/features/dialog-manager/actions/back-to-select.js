
export default function backToSelect() {
  return dispatch => {
    dispatch({
      type: 'PAUSE',
      payload: {
        pause: true,
        gameStart: true
      }
    });
  };
}