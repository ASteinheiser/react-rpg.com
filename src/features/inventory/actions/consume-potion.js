
export default function consumePotion(item) {
  return dispatch => {

    dispatch({
      type: 'HEAL_HP',
      payload: item.hp
    });

    dispatch({
      type: 'DROP_ITEM',
      payload: item
    });
  };
}