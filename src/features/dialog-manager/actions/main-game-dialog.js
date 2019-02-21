
export default function mainGameDialog() {
  return dispatch => {

    dispatch({
      type: 'PAUSE',
      payload: {
        pause: true,
        gameStart: true,
        gameSelect: 'story'
      }
    });
  };
}