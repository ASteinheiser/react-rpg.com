import React, { Component } from 'react';

import shopItems     from './shop-items';
import { EmptySlot } from '../equipped-items';
import { uuidv4 }    from '../../modules/uuid-v4';

import './styles.css';

export default class ShopInventory extends Component {

  handleBuyItem(item) {
    console.log(item);
  }

  render() {
    let shopInventoryItems = [];
    // render the shop's items
    shopItems.forEach(item => {
      shopInventoryItems.push(
        <div className='flex-row shop-item-container white-border' key={uuidv4()}>
          <EmptySlot>
            <div className='shop-item-slot'
              onClick={this.handleBuyItem.bind(this, item)}
              style={{ backgroundImage: `url('${item.image}')` }} />
          </EmptySlot>
          <div className='flex-row shop-item-text'>
            <span>
              { item.name }
            </span>
            <span>
              { item.value }
            </span>
          </div>
        </div>
      );
    })

    return (
      <div className='flex-column shop-inventory-items'>
        {
          shopInventoryItems
        }
      </div>
    );
  }
}
