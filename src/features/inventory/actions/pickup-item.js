
export default function pickupItem() {
  return (dispatch, getState) => {

    const { inventory, dialog } = getState();

    const { item } = dialog.chestOpen;

    if(!item) return;

    const { items, maxItems } = inventory;

    if(items.length < maxItems) {
    dispatch({
        type: 'GET_ITEM',
        payload: item
      });
    }
    else {
      dispatch({
        type: 'TOO_MANY_ITEMS',
        payload: item
      });
    }
  };
}