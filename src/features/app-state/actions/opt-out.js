
export default function optOut() {
  return dispatch => {
    dispatch({
      type: 'OPT_OUT_DOWNLOAD',
      payload: {}
    });
  }
}