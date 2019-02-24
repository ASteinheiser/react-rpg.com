
export default function buyItem(item) {
  return (dispatch, getState) => {

    const { stats, inventory } = getState();
    const { gold } = stats;
    const { items, maxItems } = inventory;

    // make sure player has enough gold
    if(gold >= item.value) {
      // if it's a backpack upgrade
      if(item.type === 'upgrade::backpack') {
        dispatch({
          type: 'LOSE_GOLD',
          payload: item.value
        });
        dispatch({
          type: 'UPGRADE_PACK',
          payload: { slots: item.slots }
        });
      } // otherwise, see if there's room in the inventory
      else if(items.length < maxItems) {
        dispatch({
          type: 'LOSE_GOLD',
          payload: item.value
        });
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
    }
    else {
      dispatch({
        type: 'NOT_ENOUGH_GOLD',
        payload: item
      });
    }
  };
}