import React, { useState } from 'react';
import { connect }         from 'react-redux';

import shopItems             from './shop-items';
import ViewItem              from '../view-item';
import { EmptySlot }         from '../equipped-items';
import { uuidv4 }            from '../../modules/uuid-v4';
import { MAX_ITEMS_UPGRADE } from '../../config/constants';

import './styles.scss';

const ITEMS_PER_PAGE = 5;

const ShopInventory = ({ stats, inventory }) => {

  const [buyItem, setBuyItem] = useState(false);
  const [page, setPage] = useState(0);

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
  shopItems(stats.level).forEach(item => {
    // don't show backpack upgrade if it was purchased
    if(item.type === 'upgrade::backpack' &&
      inventory.maxItems === MAX_ITEMS_UPGRADE) return;

    shopInventoryItems.push(
      <div key={uuidv4()}
        onClick={() => setBuyItem(item)}
        className='shop-item__container white-border flex-row'>

        <EmptySlot style={{borderRight: '1px solid'}}>
          <div className='shop-item__slot'
            style={{ backgroundImage: `url('${item.image}')` }} />
        </EmptySlot>

        <div className='flex-row shop-item__text'>
          <span className='flex-row shop-item__title'>
            { item.name }
          </span>

          <span className='flex-row shop-item__price'>
            { item.value }
          </span>
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
          <div className='shop-inventory__button' onClick={decrementPage}>
            <i className='fa fa-arrow-left' style={{paddingRight: 15}} />
            {'previous'}
          </div>
      }
      {
        page === MAX_PAGE ?
          <div />
          :
          <div className='shop-inventory__button' onClick={incrementPage}>
            {'next'}
            <i className='fa fa-arrow-right' style={{paddingLeft: 15}} />
          </div>
      }
    </div>
  );

  return (
    <div className='flex-column shop-inventory__container'>

      {
        buyItem &&
          <ViewItem
            buy={true}
            data={buyItem}
            onClose={() => setBuyItem(false)} />
      }

      { shopInventoryItems.splice(5 * page, ITEMS_PER_PAGE) }

      { shopInventoryButtons }

    </div>
  );
}

const mapStateToProps = ({ inventory, stats }) => ({ inventory, stats });

export default connect(mapStateToProps)(ShopInventory);
