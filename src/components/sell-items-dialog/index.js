import React, { Component } from 'react';
import { connect }          from 'react-redux';

import ConfirmDialog from '../confirm-dialog';
import MicroDialog   from '../micro-dialog';
import Backpack      from '../inventory-dialog/backpack.png';
import { EmptySlot } from '../equipped-items';
import store         from '../../config/store';

import './styles.css';

class SellItemsDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sellItemConfirm: null
    };
  }

  handleViewItem(item) {
    let itemSellPrice = Math.ceil(item.value / 2);

    this.setState({ sellItemConfirm: (
      <ConfirmDialog
        text={'Are you sure you want to sell your ' + item.name + ' for ' + itemSellPrice + ' gold ?'}
        cancelText={'Cancel'}
        cancelIcon={'times'}
        acceptText={'Sell'}
        acceptIcon={'coins'}
        confirm={this.handleConfirmSell.bind(this, item, itemSellPrice)}
        onClose={this.handleCloseItem.bind(this)} />
      )
    });
  }

  handleConfirmSell(item, sellPrice) {
    store.dispatch({
      type: 'GET_GOLD',
      payload: { value: sellPrice }
    })
    store.dispatch({
      type: 'DROP_ITEM',
      payload: item
    })
    store.dispatch({
      type: 'UNEQUIP_ITEM',
      payload: { data: item }
    })
    this.handleCloseItem();
  }

  handleCloseItem() {
    this.setState({ sellItemConfirm: null });
  }

  render() {
    const { sellItemConfirm } = this.state;
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

        { sellItemConfirm }

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
