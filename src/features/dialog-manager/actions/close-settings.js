
export default function closeSettings() {
  return dispatch => {

    dispatch({
      type: 'CLOSE_SETTINGS',
      payload: null
    });
  };
}