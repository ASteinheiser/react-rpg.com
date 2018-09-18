import React, { Component } from 'react';

import Backpack      from './backpack.png';
import CurrentItems  from '../current-items';
import Dialog        from '../dialog';
import EquippedItems from '../equipped-items';
import ViewItem      from '../view-item';

import './styles.css';

class InventoryDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      viewItem: null
    };
  }

  handleViewItem(item) {
    this.setState({ viewItem: <ViewItem data={item} onClose={this.handleCloseItem.bind(this)} /> });
  }

  handleCloseItem() {
    this.setState({ viewItem: null });
  }

  render() {
    const { viewItem } = this.state;

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
              <CurrentItems view_item={this.handleViewItem.bind(this)} />
            </div>
          </div>
        </div>
      </Dialog>
    );
  }
}

export default InventoryDialog;
