import React, { useState } from 'react';
import { connect }         from 'react-redux';

import Button          from '../../../../components/button';
import Dialog          from '../../../../components/dialog';
import SellItemsDialog from '../sell-items-dialog';
import ShopKeep        from '../../../../components/shop-keep';
import ShopInventory   from '../../../../components/shop-inventory';
import closeDialog     from '../../actions/close-dialog';

import './styles.scss';

const ShopDialog = ({ closeDialog }) => {

  const [welcome, setWelcome] = useState(true);
  const [sellItems, setSellItems] = useState(null);

  function handleOpenSellItems() {
    setSellItems(
      <SellItemsDialog
        onClose={() => setSellItems(null)} />
    );
  }

  if(welcome) {
    return(
      <Dialog>
        <div className='flex-column space-between flex-1'>

          <span className='shop-dialog__title'>
            {'Shop'}
          </span>

          <div className='flex-row'>
            <ShopKeep />

            <span className='flex-column shop-dialog__text'>
              {'Welcome traveler! Please, come in...'}
            </span>
          </div>

          <div className='flex-row shop-dialog__button'>
            <Button
              small
              onClick={closeDialog}
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

      <div className='flex-column shop-dialog__container'>

        <ShopInventory />

        <div className='flex-row shop-dialog__button'>
          <Button
            small
            onClick={closeDialog}
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
};

const actions = { closeDialog };

export default connect(null, actions)(ShopDialog);
