import React, { useState } from 'react';

import Backpack      from '../inventory-dialog/backpack.png';
import BackpackItems from '../../../../components/backpack-items';
import MicroDialog   from '../../../../components/micro-dialog';
import ViewItem      from '../../../../components/view-item';

import './styles.scss';

const SellItemsDialog = ({ onClose }) => {

  const [sellItem, setSellItem] = useState(false);

  return(
    <MicroDialog onClose={onClose} fullsize className='centered'>

      <ViewItem
        open={Boolean(sellItem)}
        data={sellItem}
        sell={true}
        onClose={() => setSellItem(false)} />

      <div className='flex-column sell-items__container'
        style={{backgroundImage: `url(${Backpack})`}}>

        <BackpackItems
          viewItem={item => setSellItem(item)} />

      </div>

    </MicroDialog>
  );
};

export default SellItemsDialog;
