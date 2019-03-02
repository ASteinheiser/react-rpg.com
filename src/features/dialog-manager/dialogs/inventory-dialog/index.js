import React, { useState } from 'react';

import Backpack      from './backpack.png';
import BackpackItems from '../../../../components/backpack-items';
import Dialog        from '../../../../components/dialog';
import EquippedItems from '../../../../components/equipped-items';
import ViewItem      from '../../../../components/view-item';

import './styles.scss';

const InventoryDialog = () => {

  const [viewItem, setViewItem] = useState(false);

  return(
    <Dialog>

      <ViewItem
        open={Boolean(viewItem)}
        data={viewItem}
        onClose={() => setViewItem(false)} />

      <div className='flex-row inventory-dialog__container'>

        <div className='flex-column inventory-dialog__child' style={{width: '40%'}}>
          <EquippedItems />
        </div>

        <div className='flex-column inventory-dialog__child' style={{width: '60%'}}>
          <div className='inventory-dialog__backpack'
            style={{backgroundImage: `url(${Backpack})`}}>

            <BackpackItems
              viewItem={item => setViewItem(item)} />

          </div>
        </div>

      </div>
    </Dialog>
  );
};

export default InventoryDialog;
