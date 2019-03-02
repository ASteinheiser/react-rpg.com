
export default function dropItem(item) {
  return dispatch => {

    dispatch({
      type: 'DROP_ITEM',
      payload: item
    });
  };
}