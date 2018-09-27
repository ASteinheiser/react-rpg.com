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
      inventoryOpen: false,
      newItemIndicator: false
    }
  }

  handleOpenInventory() {
    this.setState({ inventoryOpen: true, newItemIndicator: false }, () => {
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

  componentDidUpdate(prevProps, prevState) {
    const { inventoryOpen } = this.state;
    const { itemReceived, itemDropped } = this.props.inventory;
    let lastItemReceived = prevProps.inventory.itemReceived;
    let lastItemDropped = prevProps.inventory.itemDropped;

    if(lastItemDropped !== itemDropped && itemDropped && itemDropped !== undefined && !inventoryOpen) {
      // see if any items were dropped
      this.setState({ newItemIndicator: true });
    }
    else if(lastItemReceived !== itemReceived && itemReceived && itemReceived !== undefined && !inventoryOpen) {
      // see if any items were received
      this.setState({ newItemIndicator: true });
    }
  }

  render() {
    const { inventoryOpen, newItemIndicator } = this.state;
    const { disabled } = this.props;

    if(disabled) return null;

    return (
      <div className='flex-row inventory-container'>
        <Button
          indicator={newItemIndicator}
          onClick={inventoryOpen ?
            this.handleCloseInventory.bind(this) : this.handleOpenInventory.bind(this)}
          icon={inventoryOpen ?
            'times' : 'briefcase'}
          iconStyle={inventoryOpen ?
            {fontSize: 24} : {fontSize: 25}}
          title={inventoryOpen ?
            'Close' : 'Inventory'}
          style={{
            width: inventoryOpen ? '120px' : '190px',
            transition: 'width .25s ease-out',
            whiteSpace: 'nowrap',
            overflow: 'hidden'
          }} />
      </div>
    );
  }
}

const mapStateToProps = ({ inventory }) => {
  return { inventory };
}

export default connect(mapStateToProps)(Inventory);
