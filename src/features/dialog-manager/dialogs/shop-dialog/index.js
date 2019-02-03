import React, { useState } from 'react';

import Button          from '../../../../components/button';
import Dialog          from '../../../../components/dialog';
import SellItemsDialog from '../sell-items-dialog';
import ShopKeep        from '../../../../components/shop-keep';
import ShopInventory   from '../../../../components/shop-inventory';
import store           from '../../../../config/store';

import './styles.scss';

const ShopDialog = (props) => {

  const [welcome, setWelcome] = useState(true);
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
      payload: { pause: false }
    });
  }

  if(welcome) {
    return(
      <Dialog>
        <div className='flex-column space-between flex-1'>

          <div className='shop-title-text'>
            {'Shop'}
          </div>

          <div className='flex-row'>
            <ShopKeep />

            <div className='flex-column shop-keep-text'>
              {'Welcome traveler! Please, come in...'}
            </div>
          </div>

          <div className='flex-row shop-button-container'>
            <Button
              small
              onClick={handleCloseDialog}
              icon='walking'
              title={'Leave'} />
            <Button
              small
              onClick={() => setWelcome(false)}
              icon='angle-double-right'
              title={'Shop'} />
          </div>

        </div>
      </Dialog>
    );
  }

  return(
    <Dialog>

      { sellItems }

      <div className='flex-column shop-container'>

        <ShopInventory />

        <div className='flex-row shop-button-container'>
          <Button
            small
            onClick={handleCloseDialog}
            icon='walking'
            title={'Leave'} />
          <Button
            small
            onClick={handleOpenSellItems}
            icon='coins'
            title={'Sell'} />
        </div>
      </div>
    </Dialog>
  );
}

export default ShopDialog;
