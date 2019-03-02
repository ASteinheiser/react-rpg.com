
export default function toggleInventory() {
  return (dispatch, getState) => {

    if(getState().dialog.inventory) {
      dispatch({
        type: 'PAUSE',
        payload: { pause: false }
      });
    }
    else {
      dispatch({
        type: 'PAUSE',
        payload: {
          pause: true,
          inventory: true
        }
      });
    }
  };
}