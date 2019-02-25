
export default function unequipItem(item) {
  return dispatch => {

    dispatch({
      type: 'UNEQUIP_ITEM',
      payload: item
    });
  };
}