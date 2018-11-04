import React, { useState } from 'react';
import { connect }         from 'react-redux';

import ConfirmDialog from '../confirm-dialog';
import MicroDialog   from '../micro-dialog';
import Backpack      from '../inventory-dialog/backpack.png';
import { EmptySlot } from '../equipped-items';
import store         from '../../config/store';

import './styles.css';

const SellItemsDialog = (props) => {

  const [sellItemConfirm, setSellItemConfirm] = useState(null);

  function handleViewItem(item) {
    let itemSellPrice = Math.ceil(item.value / 2);

    setSellItemConfirm(
      <ConfirmDialog
        text={'Are you sure you want to sell your ' + item.name + ' for ' + itemSellPrice + ' gold ?'}
        cancelText={'Cancel'}
        cancelIcon={'times'}
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

  const { items, maxItems } = props.inventory;
  const itemSlots = new Array(maxItems).fill(null);
  // for each empty slot
  itemSlots.forEach((item, index) => {
    // see if there are more items to render from the inventory
    if(items.length > index) {
      // assign the slot to that item
      itemSlots[index] = (
        <div onClick={handleViewItem.bind(this, items[index])}
          style={{
            backgroundImage: `url('${items[index].image}')`,
            width: '40px',
            height: '40px',
            cursor: 'pointer'
          }} />
      );
    }
  });

  return(
    <MicroDialog onClose={props.onClose} inventory_size={true}>

      { sellItemConfirm }

      <div className='flex-column sell-items-container'
        style={{backgroundImage: `url(${Backpack})`}}>
        <div className='flex-column sell-items-padding'>
          <div className='white-border'>
            <div className='flex-row'>
              <EmptySlot>
                {itemSlots[0]}
              </EmptySlot>
              <EmptySlot>
                {itemSlots[1]}
              </EmptySlot>
              <EmptySlot>
                {itemSlots[2]}
              </EmptySlot>
              <EmptySlot>
                {itemSlots[3]}
              </EmptySlot>
            </div>
            <div className='flex-row'>
              <EmptySlot>
                {itemSlots[4]}
              </EmptySlot>
              <EmptySlot>
                {itemSlots[5]}
              </EmptySlot>
              <EmptySlot>
                {itemSlots[6]}
              </EmptySlot>
              <EmptySlot>
                {itemSlots[7]}
              </EmptySlot>
            </div>
          </div>
        </div>
      </div>

    </MicroDialog>
  );
}

const mapStateToProps = ({ inventory }) => {
  return { inventory };
}

export default connect(mapStateToProps)(SellItemsDialog);
