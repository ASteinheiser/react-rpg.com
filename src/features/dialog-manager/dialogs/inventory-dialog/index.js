import React, { useState } from 'react';

import Backpack      from './backpack.png';
import BackpackItems from '../../../../components/backpack-items';
import Dialog        from '../../../../components/dialog';
import EquippedItems from '../../../../components/equipped-items';
import ViewItem      from '../../../../components/view-item';

import './styles.scss';

const InventoryDialog = () => {

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

      <div className='flex-row inventory-dialog__container'>

        <div className='flex-column inventory-dialog__child'
          style={{width: '40%'}}>
          <EquippedItems />
        </div>

        <div className='flex-column inventory-dialog__child'
          style={{width: '60%'}}>
          <div className='inventory-dialog__backpack' style={{backgroundImage: `url(${Backpack})`}}>
            <BackpackItems view_item={handleViewItem} />
          </div>
        </div>

      </div>
    </Dialog>
  );
}

export default InventoryDialog;
