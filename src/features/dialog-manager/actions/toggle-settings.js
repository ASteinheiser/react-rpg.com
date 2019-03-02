
export default function toggleSettings() {
  return (dispatch, getState) => {

    if(getState().dialog.settings) {
      dispatch({
        type: 'CLOSE_SETTINGS',
        payload: null
      });
    }
    else {
      dispatch({
        type: 'OPEN_SETTINGS',
        payload: null
      });
    }
  };
}