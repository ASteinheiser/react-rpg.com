
export default function consumePotion(item) {
  return dispatch => {

    dispatch({
      type: 'HEAL_HP',
      payload: { value: item.hp }
    });

    dispatch({
      type: 'DROP_ITEM',
      payload: item
    });
  }
}