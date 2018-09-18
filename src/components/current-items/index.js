import React, { Component } from 'react';
import { connect }          from 'react-redux';

import InventorySlot from '../equipped-items/inventory-slot.png';

import './styles.css';

function EmptyInventorySlot(props) {
  return (
    <div style={{
        backgroundImage: `url('${InventorySlot}')`,
        backgroundSize: 'contain',
        width: '40px',
        height: '40px'
      }}>
      { props.children }
    </div>
  );
}

class CurrentItems extends Component {

  viewItem(item) {
    this.props.view_item(item);
  }

  render() {
    let { items, maxItems } = this.props.inventory;

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
          <EmptyInventorySlot>
            { itemSlots[0] }
          </EmptyInventorySlot>
          <EmptyInventorySlot>
            { itemSlots[1] }
          </EmptyInventorySlot>
          <EmptyInventorySlot>
            { itemSlots[2] }
          </EmptyInventorySlot>
          <EmptyInventorySlot>
            { itemSlots[3] }
          </EmptyInventorySlot>
        </div>

        <div className='flex-row'>
          <EmptyInventorySlot>
            { itemSlots[4] }
          </EmptyInventorySlot>
          <EmptyInventorySlot>
            { itemSlots[5] }
          </EmptyInventorySlot>
          <EmptyInventorySlot>
            { itemSlots[6] }
          </EmptyInventorySlot>
          <EmptyInventorySlot>
            { itemSlots[7] }
          </EmptyInventorySlot>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ inventory }) => {
  return { inventory };
}

export default connect(mapStateToProps)(CurrentItems);
