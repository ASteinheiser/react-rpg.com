import React, { useState } from 'react';
import { connect }         from 'react-redux';

import ConfirmDialog from '../confirm-dialog';
import MicroDialog   from '../micro-dialog';
import shopItems     from './shop-items';
import { EmptySlot } from '../equipped-items';
import { uuidv4 }    from '../../modules/uuid-v4';
import store         from '../../config/store';

import './styles.css';

const ITEMS_PER_PAGE = 5;

const ShopInventory = (props) => {

  const [buyItemDialog, setBuyItemDialog] = useState(null);
  const [page, setPage] = useState(0);

  function handleBuyItem(item) {
    setBuyItemDialog(
      <MicroDialog no_button>
        <ConfirmDialog
          text={'Are you sure you want to buy ' + item.name + ' for ' + item.value + ' gold?'}
          cancelText={'Cancel'}
          acceptText={'Buy'}
          acceptIcon={'coins'}
          confirm={() => handleConfirmBuyItem(item)}
          onClose={handleCloseBuyItem} />
      </MicroDialog>
    );
  }

  function handleConfirmBuyItem(item) {
    const { gold } = props.stats;
    const { items, maxItems } = props.inventory;
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
      } // if it's a backpack upgrade
      else if(item.type === 'upgrade::backpack') {
        store.dispatch({
          type: 'LOSE_GOLD',
          payload: { value: item.value }
        });
        store.dispatch({
          type: 'UPGRADE_PACK',
          payload: { slots: item.slots }
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

  function decrementPage() {
    if(page > 0) {
      setPage(page - 1);
    }
  }

  function incrementPage() {
    if(page < MAX_PAGE) {
      setPage(page + 1);
    }
  }

  let shopInventoryItems = [];
  // render the shop's items
  shopItems.forEach(item => {
    // don't show backpack upgrade if it was purchased
    if(props.inventory.maxItems === 12 && item.type === 'upgrade::backpack') return;

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

  const MAX_PAGE = Math.ceil(shopInventoryItems.length / ITEMS_PER_PAGE) - 1;

  let shopInventoryButtons = (
    <div className='flex-row space-between'>
      {
        page === 0 ?
          <div />
          :
          <div className='shop-page-button' onClick={decrementPage}>
            <i className='fa fa-arrow-left' style={{paddingRight: 15}} />
            {'previous'}
          </div>
      }
      {
        page === MAX_PAGE ?
          <div />
          :
          <div className='shop-page-button' onClick={incrementPage}>
            {'next'}
            <i className='fa fa-arrow-right' style={{paddingLeft: 15}} />
          </div>
      }
    </div>
  );

  return (
    <div className='flex-column shop-inventory-items'>

      { buyItemDialog }

      { shopInventoryItems.splice(5 * page, ITEMS_PER_PAGE) }

      { shopInventoryButtons }

    </div>
  );
}

const mapStateToProps = ({ inventory, stats }) => ({ inventory, stats });

export default connect(mapStateToProps)(ShopInventory);
