
export default function equipItem(item) {
  return dispatch => {

    dispatch({
      type: 'EQUIP_ITEM',
      payload: item
    });
  };
}