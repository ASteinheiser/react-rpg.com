import React, { useState } from 'react';

import ConfirmDialog from '../confirm-dialog';
import CurrentItems  from '../current-items';
import MicroDialog   from '../micro-dialog';
import Backpack      from '../inventory-dialog/backpack.png';
import store         from '../../config/store';

import './styles.scss';

const SellItemsDialog = (props) => {

  const [sellItemConfirm, setSellItemConfirm] = useState(null);

  function handleViewItem(item) {
    let itemSellPrice = Math.ceil(item.value / 2);

    setSellItemConfirm(
      <ConfirmDialog
        text={'Are you sure you want to sell your ' + item.name + ' for ' + itemSellPrice + ' gold ?'}
        cancelText={'Cancel'}
        acceptText={'Sell'}
        acceptIcon={'coins'}
        confirm={() => handleConfirmSell(item, itemSellPrice)}
        onClose={handleCloseItem} />
    );
  }

  function handleConfirmSell(item, sellPrice) {
    store.dispatch({
      type: 'GET_GOLD',
      payload: { value: sellPrice }
    });
    store.dispatch({
      type: 'DROP_ITEM',
      payload: item
    });

    const { equippedItems } = store.getState().stats;
    let itemEquipped = false;
    // check if the item was equipped, then take it off
    switch(item.type) {
      case 'weapon':
        if(equippedItems['weapon'] === item) itemEquipped = true;
        break;
      case 'ring':
        if(equippedItems['ring'] === item) itemEquipped = true;
        break;
      case 'armor::body':
        if(equippedItems['armor'] && equippedItems['armor']['body'] === item) itemEquipped = true;
        break;
      case 'armor::pants':
        if(equippedItems['armor'] && equippedItems['armor']['pants'] === item) itemEquipped = true;
        break;
      case 'armor::helmet':
        if(equippedItems['armor'] && equippedItems['armor']['helmet'] === item) itemEquipped = true;
        break;
      case 'armor::boots':
        if(equippedItems['armor'] && equippedItems['armor']['boots'] === item) itemEquipped = true;
        break;
      case 'armor::gloves':
        if(equippedItems['armor'] && equippedItems['armor']['gloves'] === item) itemEquipped = true;
        break;
      default:
    }

    if(itemEquipped) {
      store.dispatch({
        type: 'UNEQUIP_ITEM',
        payload: { data: item }
      });
    }

    handleCloseItem();
  }

  function handleCloseItem() {
    setSellItemConfirm(null);
  }

  return(
    <MicroDialog onClose={props.onClose} inventory_size={true}>

      { sellItemConfirm }

      <div className='flex-column sell-items-container'
        style={{backgroundImage: `url(${Backpack})`}}>

        <CurrentItems view_item={handleViewItem} />

      </div>

    </MicroDialog>
  );
}

export default SellItemsDialog;
