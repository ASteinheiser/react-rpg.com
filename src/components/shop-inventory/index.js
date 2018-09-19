import React, { Component } from 'react';

import StoreFront    from './store-front.png';
import { EmptySlot } from '../equipped-items';

import './styles.css';

export default class ShopInventory extends Component {
  render() {
    return (
      <div className='flex-column shop-inventory-container'
        style={{backgroundImage: `url(${StoreFront})`}}>
        <div className='flex-column shop-inventory-items white-border'>
          <div className='flex-row'>
            <EmptySlot>
            </EmptySlot>
            <EmptySlot>
            </EmptySlot>
            <EmptySlot>
            </EmptySlot>
            <EmptySlot>
            </EmptySlot>
          </div>
          <div className='flex-row'>
            <EmptySlot>
            </EmptySlot>
            <EmptySlot>
            </EmptySlot>
            <EmptySlot>
            </EmptySlot>
            <EmptySlot>
            </EmptySlot>
          </div>
        </div>
      </div>
    );
  }
}
