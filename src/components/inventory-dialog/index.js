import React, { Component } from 'react';

import CurrentItems  from '../current-items';
import Dialog        from '../dialog';
import EquippedItems from '../equipped-items';

import './styles.css';

class InventoryDialog extends Component {
  render() {
    return(
      <Dialog>
        <div className='flex-row inventory-dialog-title'>
          <i className='fa fa-briefcase inventory-dialog-title-icon' />
          <span> {'View Inventory'} </span>
        </div>

        <div className='flex-row inventory-dialog-container'>
          <div className='flex-column inventory-dialog-child'>
            <span className='inventory-dialog-section-text'>
              {'Equipped'}
            </span>
            <EquippedItems />
          </div>

          <div className='flex-column inventory-dialog-child'>
            <span className='inventory-dialog-section-text'>
              {'All Items'}
            </span>
            <CurrentItems />
          </div>
        </div>
      </Dialog>
    );
  }
}

export default InventoryDialog;
