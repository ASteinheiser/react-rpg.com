
export default function optOutDownload() {
  return dispatch => {
    dispatch({
      type: 'OPT_OUT_DOWNLOAD',
      payload: null
    });
  };
}