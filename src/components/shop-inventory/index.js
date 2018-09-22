import React, { Component } from 'react';

import ConfirmDialog from '../confirm-dialog';
import MicroDialog   from '../micro-dialog';
import shopItems     from './shop-items';
import { EmptySlot } from '../equipped-items';
import { uuidv4 }    from '../../modules/uuid-v4';
import store         from '../../config/store';

import './styles.css';

export default class ShopInventory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      buyItemDialog: null,
      page: 1
    }
  }

  handleCloseBuyItem() {
    this.setState({ buyItemDialog: null });
  }

  handleBuyItem(item) {
    this.setState({ buyItemDialog: (
      <MicroDialog no_button>
        <ConfirmDialog
          text={'Are you sure you want to buy ' + item.name + ' for ' + item.value + ' gold?'}
          cancelText={'Cancel'}
          cancelIcon={'times'}
          acceptText={'Buy'}
          acceptIcon={'coins'}
          confirm={this.handleConfirmBuyItem.bind(this, item)}
          onClose={this.handleCloseBuyItem.bind(this)} />
      </MicroDialog>
      )
    });
  }

  handleConfirmBuyItem(item) {
    const { gold } = store.getState().stats;
    // make sure player has enough gold
    if(gold >= item.value) {
      store.dispatch({
        type: 'LOSE_GOLD',
        payload: { value: item.value }
      })
      if(item.type === 'potion') {
        store.dispatch({
          type: 'HEAL_HP',
          payload: { value: parseInt(item.hp, 10) }
        })
      } else {
        store.dispatch({
          type: 'GET_ITEM',
          payload: item
        })
      }
    } else {
      // not enough gold!
    }
    this.handleCloseBuyItem();
  }

  render() {
    const { buyItemDialog, page } = this.state;

    let shopInventoryItems = [];
    // render the shop's items
    shopItems.forEach(item => {
      shopInventoryItems.push(
        <div key={uuidv4()}
          onClick={this.handleBuyItem.bind(this, item)}
          className='flex-row shop-item-container white-border'>
          <EmptySlot style={{borderRight: '1px solid'}}>
            <div className='shop-item-slot'
              style={{ backgroundImage: `url('${item.image}')` }} />
          </EmptySlot>
          <div className='flex-row shop-item-text'>
            <div className='flex-row shop-item-title'>
              { item.name }
            </div>
            <div className='flex-row shop-item-price'>
              { item.value }
            </div>
          </div>
        </div>
      );
    })

    let shopInventoryButtons = (
      <div className='flex-row space-between'>
        {
          page === 1 ?
            <div />
            :
            <div className='shop-page-button' onClick={() => {this.setState({page: 1})}}>
              <i className='fa fa-arrow-left' style={{paddingRight: 15}} />
              {'previous'}
            </div>
        }
        {
          page === 1 ?
            <div className='shop-page-button' onClick={() => {this.setState({page: 2})}}>
              {'next'}
              <i className='fa fa-arrow-right' style={{paddingLeft: 15}} />
            </div>
            :
            <div />
        }
      </div>
    );

    return (
      <div className='flex-column shop-inventory-items'>
        {
          buyItemDialog
        }
        {
          page === 1 ?
            shopInventoryItems.slice(0, 5)
            :
            shopInventoryItems.slice(5, 10)
        }
        {
          shopInventoryButtons
        }
      </div>
    );
  }
}
