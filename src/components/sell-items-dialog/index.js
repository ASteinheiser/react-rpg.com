import React, { Component } from 'react';
import { connect }          from 'react-redux';

import Backpack      from '../inventory-dialog/backpack.png';
import { EmptySlot } from '../equipped-items';
import MicroDialog   from '../micro-dialog';

import './styles.css';

class SellItemsDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      viewItem: null
    };
  }

  handleViewItem(item) {
    console.log(item);
    // this.setState({ viewItem: <ViewItem data={item} onClose={this.handleCloseItem.bind(this)} /> });
  }

  handleCloseItem() {
    this.setState({ viewItem: null });
  }

  render() {
    const { viewItem } = this.state;
    const { items, maxItems } = this.props.inventory;

    const itemSlots = new Array(maxItems).fill(null);
    // for each empty slot
    itemSlots.forEach((item, index) => {
      // see if there are more items to render from the inventory
      if(items.length > index) {
        // assign the slot to that item
        itemSlots[index] = (
          <div onClick={this.handleViewItem.bind(this, items[index])}
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

    return(
      <MicroDialog onClose={this.props.onClose} inventory_size={true}>

        { viewItem }

        <div className='flex-column sell-items-container'
          style={{backgroundImage: `url(${Backpack})`}}>
          <div className='flex-column sell-items-padding'>
            <div className='white-border'>
              <div className='flex-row'>
                <EmptySlot>
                  {itemSlots[0]}
                </EmptySlot>
                <EmptySlot>
                  {itemSlots[1]}
                </EmptySlot>
                <EmptySlot>
                  {itemSlots[2]}
                </EmptySlot>
                <EmptySlot>
                  {itemSlots[3]}
                </EmptySlot>
              </div>
              <div className='flex-row'>
                <EmptySlot>
                  {itemSlots[4]}
                </EmptySlot>
                <EmptySlot>
                  {itemSlots[5]}
                </EmptySlot>
                <EmptySlot>
                  {itemSlots[6]}
                </EmptySlot>
                <EmptySlot>
                  {itemSlots[7]}
                </EmptySlot>
              </div>
            </div>
          </div>
        </div>

      </MicroDialog>
    );
  }
}

const mapStateToProps = ({ inventory }) => {
  return { inventory };
}

export default connect(mapStateToProps)(SellItemsDialog);
