
export default function setGameSound(value) {
  return dispatch => {

    dispatch({
      type: 'SET_SOUND',
      payload: value
    });
  };
}