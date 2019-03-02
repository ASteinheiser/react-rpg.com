import React, { useState } from 'react';
import { connect }         from 'react-redux';

import ShopItem              from './shop-item';
import shopItems             from './shop-items';
import ViewItem              from '../view-item';
import uuidv4                from '../../utils/uuid-v4';
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

  const shopInventoryItems = [];
  // render the shop's items
  shopItems(stats.level).forEach(item => {
    // don't show backpack upgrade if it was purchased
    if(item.type === 'upgrade::backpack' &&
      inventory.maxItems === MAX_ITEMS_UPGRADE) return;

    shopInventoryItems.push(
      <ShopItem
        key={uuidv4()}
        item={item}
        buyItem={() => setBuyItem(item)} />
    );
  });

  const MAX_PAGE = Math.ceil(shopInventoryItems.length / ITEMS_PER_PAGE) - 1;

  return (
    <div className='flex-column shop-inventory__container'>

      <ViewItem
        open={Boolean(buyItem)}
        buy={true}
        data={buyItem}
        onClose={() => setBuyItem(false)} />

      { shopInventoryItems.splice(5 * page, ITEMS_PER_PAGE) }

      <div className='flex-row space-between'>
        {
          page > 0 ?
            <button className='shop-inventory__button' onClick={decrementPage}>
              <i className='fa fa-arrow-left' style={{paddingRight: 15}} />
              {'previous'}
            </button>
            :
            <div />
        }
        {
          page < MAX_PAGE ?
            <button className='shop-inventory__button' onClick={incrementPage}>
              {'next'}
              <i className='fa fa-arrow-right' style={{paddingLeft: 15}} />
            </button>
            :
            <div />
        }
      </div>

    </div>
  );
};

const mapStateToProps = ({ inventory, stats }) => ({ inventory, stats });

export default connect(mapStateToProps)(ShopInventory);
