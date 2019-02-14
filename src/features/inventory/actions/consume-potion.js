
export default function consumePotion(item) {
  return dispatch => {

    dispatch({
      type: 'HEAL_HP',
      payload: { value: parseInt(item.hp, 10) }
    });

    dispatch({
      type: 'DROP_ITEM',
      payload: item
    });
  }
}