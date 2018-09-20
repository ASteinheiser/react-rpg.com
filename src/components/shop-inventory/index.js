import React, { Component } from 'react';

import storeItems    from './store-items';
import StoreFront    from './store-front.png';
import { EmptySlot } from '../equipped-items';

import './styles.css';

export default class ShopInventory extends Component {
  render() {
    let shopInventoryItems = [];
    storeItems.forEach(item => {
      shopInventoryItems.push(
        <div className='flex-row'>
          <EmptySlot>
          </EmptySlot>
        </div>
      );
    })

    return (
      <div className='flex-column shop-inventory-container'
        style={{backgroundImage: `url(${StoreFront})`}}>
        <div className='flex-column shop-inventory-items white-border'>
          {
            shopInventoryItems
          }
        </div>
      </div>
    );
  }
}
