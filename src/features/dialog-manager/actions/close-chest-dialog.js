
export default function closeChestDialog() {
  return dispatch => {

    dispatch({
      type: 'SET_CHEST_DATA',
      payload: false
    });
    dispatch({
      type: 'PAUSE',
      payload: { pause: false }
    });
  };
}