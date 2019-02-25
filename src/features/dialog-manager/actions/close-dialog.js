
export default function closeDialog() {
  return dispatch => {

    dispatch({
      type: 'PAUSE',
      payload: { pause: false }
    });
  };
}