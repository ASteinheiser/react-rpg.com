
export default function pickupItem(item) {
  return (dispatch, getState) => {

    if(!item) return;

    const { items, maxItems } = getState().inventory;

    if(items.length < maxItems) {
      dispatch({
        type: 'GET_ITEM',
        payload: item
      });
    } else {
      dispatch({
        type: 'TOO_MANY_ITEMS',
        payload: item
      });
    }
  }
}