
export default function sellItem(item) {
  return (dispatch, getState) => {

    const sellPrice = Math.ceil(item.value / 2);

    dispatch({
      type: 'GET_GOLD',
      payload: sellPrice
    });

    dispatch({
      type: 'DROP_ITEM',
      payload: item
    });

    const { equippedItems } = getState().stats;
    let itemEquipped = false;
    // check if the item was equipped, then take it off
    switch(item.type) {
      case 'weapon':
        if(JSON.stringify(equippedItems.weapon) === JSON.stringify(item)) itemEquipped = true;
        break;
      case 'ring':
        if(JSON.stringify(equippedItems.ring) === JSON.stringify(item)) itemEquipped = true;
        break;
      case 'armor::body':
        if(equippedItems.armor && JSON.stringify(equippedItems.armor.body) === JSON.stringify(item)) itemEquipped = true;
        break;
      case 'armor::pants':
        if(equippedItems.armor && JSON.stringify(equippedItems.armor.pants) === JSON.stringify(item)) itemEquipped = true;
        break;
      case 'armor::helmet':
        if(equippedItems.armor && JSON.stringify(equippedItems.armor.helmet) === JSON.stringify(item)) itemEquipped = true;
        break;
      case 'armor::boots':
        if(equippedItems.armor && JSON.stringify(equippedItems.armor.boots) === JSON.stringify(item)) itemEquipped = true;
        break;
      case 'armor::gloves':
        if(equippedItems.armor && JSON.stringify(equippedItems.armor.gloves) === JSON.stringify(item)) itemEquipped = true;
        break;
      default:
    }

    if(itemEquipped) {
      dispatch({
        type: 'UNEQUIP_ITEM',
        payload: item
      });
    }
  };
}