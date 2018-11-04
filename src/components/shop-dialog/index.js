import React, { useState } from 'react';

import Button          from '../button';
import Dialog          from '../dialog';
import SellItemsDialog from '../sell-items-dialog';
import ShopKeep        from '../shop-keep';
import ShopInventory   from '../shop-inventory';
import store           from '../../config/store';

import './styles.css';

const ShopDialog = (props) => {

  const [sellItems, setSellItems] = useState(null);

  function handleOpenSellItems() {
    setSellItems(
      <SellItemsDialog
        onClose={handleCloseSellItems} />
    );
  }

  function handleCloseSellItems() {
    setSellItems(null);
  }

  function handleCloseDialog() {
    store.dispatch({
      type: 'PAUSE',
      payload: { component: false }
    });
  }

  return(
    <Dialog>

      { sellItems }

      <div className='flex-column shop-container'>

        <span className='shop-title-text'>
          {'Shop'}
        </span>

        <div className='flex-row shop-container'>
          <div className='flex-column shop-container-child-1'>
            <ShopKeep />
          </div>

          <div className='flex-column shop-container-child-2'>
            <ShopInventory />
          </div>
        </div>

        <div className='flex-row shop-button-container'>
          <Button
            onClick={handleCloseDialog}
            icon='walking'
            title={'Leave Shop'} />
          <Button
            onClick={handleOpenSellItems}
            icon='coins'
            title={'Sell Items'} />
        </div>
      </div>
    </Dialog>
  );
}

export default ShopDialog;
