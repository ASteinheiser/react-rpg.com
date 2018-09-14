import React, { Component } from 'react';
import { connect }          from 'react-redux';

import InventoryDialog from '../../components/inventory-dialog';
import store           from '../../config/store';

import './styles.css';

class Inventory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inventoryOpen: false
    }
  }

  handleOpenInventory() {
    this.setState({ inventoryOpen: true }, () => {
      store.dispatch({
        type: 'PAUSE',
        payload: { component: <InventoryDialog /> }
      });
    });
  }

  handleCloseInventory() {
    this.setState({ inventoryOpen: false }, () => {
      store.dispatch({
        type: 'PAUSE',
        payload: { component: false }
      });
    });
  }

  render() {
    const { inventoryOpen } = this.state;

    return (
      <div className='inventory-container'>
        {
            inventoryOpen ?
              <div onClick={this.handleCloseInventory.bind(this)}
                className='inventory-button-container'>
                <div className='flex-row inventory-button'>
                  <i className='fa fa-times close-icon' />
                  <span className='inventory-close-padding'>
                    {'Close'}
                  </span>
                </div>
              </div>
              :
              <div onClick={this.handleOpenInventory.bind(this)}
                className='inventory-button-container'>
                <div className='flex-row inventory-button'>
                  <i className='fa fa-briefcase inventory-icon' />
                  <span> {'Inventory'} </span>
                </div>
              </div>
        }
      </div>
    );
  }
}

const mapStateToProps = ({ inventory }) => {
  return { inventory };
}

export default connect(mapStateToProps)(Inventory);
