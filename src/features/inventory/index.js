import React, { Component } from 'react';
import { connect }          from 'react-redux';

import Button          from '../../components/button';
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
        payload: { component: <InventoryDialog />, inventory: true }
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
      <div className='flex-row inventory-container'>
        {
          inventoryOpen ?
            <Button
              onClick={this.handleCloseInventory.bind(this)}
              icon='times'
              title={'Close'} />
            :
            <Button
              onClick={this.handleOpenInventory.bind(this)}
              icon='briefcase'
              title={'Inventory'} />
        }
      </div>
    );
  }
}

const mapStateToProps = ({ inventory }) => {
  return { inventory };
}

export default connect(mapStateToProps)(Inventory);
