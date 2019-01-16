import React, { useState } from 'react';

import Backpack      from './backpack.png';
import CurrentItems  from '../current-items';
import Dialog        from '../dialog';
import EquippedItems from '../equipped-items';
import ViewItem      from '../view-item';

import './styles.scss';

const InventoryDialog = (props) => {

  const [viewItem, setViewItem] = useState(null);

  function handleViewItem(item) {
    setViewItem(
      <ViewItem
        data={item}
        onClose={handleCloseItem} />
    );
  }

  function handleCloseItem() {
    setViewItem(null);
  }

  return(
    <Dialog>

      { viewItem }

      <div className='flex-row inventory-dialog-title'>
        <span> {'Inventory'} </span>
      </div>

      <div className='flex-row inventory-dialog-container'>
        <div className='flex-column inventory-dialog-child'>
          <EquippedItems />
        </div>

        <div className='flex-column inventory-dialog-child'>
          <div className='inventory-backpack' style={{backgroundImage: `url(${Backpack})`}}>
            <CurrentItems view_item={handleViewItem} />
          </div>
        </div>
      </div>
    </Dialog>
  );
}

export default InventoryDialog;
