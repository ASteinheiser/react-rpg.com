import React, { useState } from 'react';

import ConfirmDialog from '../confirm-dialog';
import MicroDialog   from '../micro-dialog';
import shopItems     from './shop-items';
import { EmptySlot } from '../equipped-items';
import { uuidv4 }    from '../../modules/uuid-v4';
import store         from '../../config/store';

import './styles.css';

const ShopInventory = (props) => {

  const [buyItemDialog, setBuyItemDialog] = useState(null);
  const [page, setPage] = useState(1);

  function handleBuyItem(item) {
    setBuyItemDialog(
      <MicroDialog no_button>
        <ConfirmDialog
          text={'Are you sure you want to buy ' + item.name + ' for ' + item.value + ' gold?'}
          cancelText={'Cancel'}
          cancelIcon={'times'}
          acceptText={'Buy'}
          acceptIcon={'coins'}
          confirm={() => handleConfirmBuyItem(item)}
          onClose={handleCloseBuyItem} />
      </MicroDialog>
    );
  }

  function handleConfirmBuyItem(item) {
    const { gold } = store.getState().stats;
    const { items, maxItems } = store.getState().inventory;
    // make sure player has enough gold
    if(gold >= item.value) {
      // if it's an hp potion
      if(item.type === 'potion') {
        store.dispatch({
          type: 'LOSE_GOLD',
          payload: { value: item.value }
        });
        store.dispatch({
          type: 'HEAL_HP',
          payload: { value: parseInt(item.hp, 10) }
        });
      } // otherwise, see if there's room in the inventory
      else if(items.length < maxItems) {
        store.dispatch({
          type: 'LOSE_GOLD',
          payload: { value: item.value }
        });
        store.dispatch({
          type: 'GET_ITEM',
          payload: item
        });
      } else {
        // inventory full
        store.dispatch({
          type: 'TOO_MANY_ITEMS',
          payload: item
        });
      }
    } else {
      // not enough gold!
      store.dispatch({
        type: 'NOT_ENOUGH_GOLD',
        payload: item
      });
    }

    handleCloseBuyItem();
  }

  function handleCloseBuyItem() {
    setBuyItemDialog(null);
  }

  let shopInventoryItems = [];
  // render the shop's items
  shopItems.forEach(item => {
    shopInventoryItems.push(
      <div key={uuidv4()}
        onClick={() => handleBuyItem(item)}
        className='flex-row shop-item-container white-border'>

        <EmptySlot style={{borderRight: '1px solid'}}>
          <div className='shop-item-slot'
            style={{ backgroundImage: `url('${item.image}')` }} />
        </EmptySlot>

        <div className='flex-row shop-item-text'>
          <div className='flex-row shop-item-title'>
            { item.name }
          </div>

          <div className='flex-row shop-item-price'>
            { item.value }
          </div>
        </div>
      </div>
    );
  })

  let shopInventoryButtons = (
    <div className='flex-row space-between'>
      {
        page === 1 ?
          <div />
          :
          <div className='shop-page-button' onClick={() => setPage(1)}>
            <i className='fa fa-arrow-left' style={{paddingRight: 15}} />
            {'previous'}
          </div>
      }
      {
        page === 1 ?
          <div className='shop-page-button' onClick={() => setPage(2)}>
            {'next'}
            <i className='fa fa-arrow-right' style={{paddingLeft: 15}} />
          </div>
          :
          <div />
      }
    </div>
  );

  return (
    <div className='flex-column shop-inventory-items'>

      { buyItemDialog }

      {
        page === 1 ?
          shopInventoryItems.slice(0, 5)
          :
          shopInventoryItems.slice(5, 10)
      }

      { shopInventoryButtons }

    </div>
  );
}

export default ShopInventory;
