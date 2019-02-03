import React, { useState } from 'react';

import Backpack      from '../inventory-dialog/backpack.png';
import BackpackItems from '../../../../components/backpack-items';
import MicroDialog   from '../../../../components/micro-dialog';
import ViewItem      from '../../../../components/view-item';

import './styles.scss';

const SellItemsDialog = (props) => {

  const [sellItem, setSellItem] = useState(false);

  return(
    <MicroDialog onClose={props.onClose}>

      {
        sellItem ?
          <ViewItem
            data={sellItem}
            sell={true}
            onClose={() => setSellItem(false)} />
            :
            null
      }

      <div className='flex-column sell-items-container'
        style={{backgroundImage: `url(${Backpack})`}}>

        <BackpackItems
          view_item={item => setSellItem(item)} />

      </div>

    </MicroDialog>
  );
}

export default SellItemsDialog;
