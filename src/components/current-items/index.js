import React, { Component } from 'react';
import { connect }          from 'react-redux';

import { EmptySlot } from '../equipped-items';

import './styles.css';

class CurrentItems extends Component {

  viewItem(item) {
    this.props.view_item(item);
  }

  render() {
    const { items, maxItems } = this.props.inventory;

    const itemSlots = new Array(maxItems).fill(null);
    // for each empty slot
    itemSlots.forEach((item, index) => {
      // see if there are more items to render from the inventory
      if(items.length > index) {
        // assign the slot to that item
        itemSlots[index] = (
          <div onClick={this.viewItem.bind(this, items[index])}
            style={{
              backgroundImage: `url('${items[index].image}')`,
              backgroundSize: 'contain',
              width: '40px',
              height: '40px',
              cursor: 'pointer'
            }} />
        );
      }
    });

    return (
      <div className='flex-column current-items-container white-border'>
        <div className='flex-row'>
          <EmptySlot>
            { itemSlots[0] }
          </EmptySlot>
          <EmptySlot>
            { itemSlots[1] }
          </EmptySlot>
          <EmptySlot>
            { itemSlots[2] }
          </EmptySlot>
          <EmptySlot>
            { itemSlots[3] }
          </EmptySlot>
        </div>

        <div className='flex-row'>
          <EmptySlot>
            { itemSlots[4] }
          </EmptySlot>
          <EmptySlot>
            { itemSlots[5] }
          </EmptySlot>
          <EmptySlot>
            { itemSlots[6] }
          </EmptySlot>
          <EmptySlot>
            { itemSlots[7] }
          </EmptySlot>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ inventory }) => {
  return { inventory };
}

export default connect(mapStateToProps)(CurrentItems);
