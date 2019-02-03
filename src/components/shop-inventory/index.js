import React, { useState } from 'react';
import { connect }         from 'react-redux';

import shopItems     from './shop-items';
import ViewItem      from '../view-item';
import { EmptySlot } from '../equipped-items';
import { uuidv4 }    from '../../modules/uuid-v4';

import './styles.scss';

const ITEMS_PER_PAGE = 5;

const ShopInventory = (props) => {

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
  shopItems(props.stats.level).forEach(item => {
    // don't show backpack upgrade if it was purchased
    if(props.inventory.maxItems === 12 && item.type === 'upgrade::backpack') return;

    shopInventoryItems.push(
      <div key={uuidv4()}
        onClick={() => setBuyItem(item)}
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

      {
        buyItem ?
          <ViewItem
            buy={true}
            data={buyItem}
            onClose={() => setBuyItem(false)} />
          :
          null
      }

      { shopInventoryItems.splice(5 * page, ITEMS_PER_PAGE) }

      { shopInventoryButtons }

    </div>
  );
}

const mapStateToProps = ({ inventory, stats }) => ({ inventory, stats });

export default connect(mapStateToProps)(ShopInventory);
