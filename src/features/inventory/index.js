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
      newItemIndicator: false
    }
  }

  handleOpenInventory() {
    this.setState({ newItemIndicator: false }, () => {
      store.dispatch({
        type: 'PAUSE',
        payload: {
          component: <InventoryDialog />,
          inventory: true
        }
      });
    });
  }

  handleCloseInventory() {
    store.dispatch({
      type: 'PAUSE',
      payload: { component: null }
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { inventory } = this.props.world;
    const { itemReceived, itemDropped } = this.props.inventory;
    let lastItemReceived = prevProps.inventory.itemReceived;
    let lastItemDropped = prevProps.inventory.itemDropped;

    if(lastItemDropped !== itemDropped && itemDropped && itemDropped !== undefined && !inventory) {
      // see if any items were dropped
      this.setState({ newItemIndicator: true });
    }
    else if(lastItemReceived !== itemReceived && itemReceived && itemReceived !== undefined && !inventory) {
      // see if any items were received
      this.setState({ newItemIndicator: true });
    }
  }

  render() {
    const { newItemIndicator } = this.state;
    const { disabled, world } = this.props;

    const open = world.inventory;

    if(disabled) return null;

    return (
      <div className='flex-row inventory-container'>
        <Button
          indicator={newItemIndicator}
          onClick={open ?
            this.handleCloseInventory.bind(this) : this.handleOpenInventory.bind(this)}
          icon={open ?
            'times' : 'briefcase'}
          iconStyle={open ?
            {fontSize: 24} : {fontSize: 25}}
          title={open ?
            'Close' : 'Inventory'}
          style={{
            width: open ? '120px' : '190px',
            transition: 'width .25s ease-out',
            whiteSpace: 'nowrap',
            overflow: 'hidden'
          }} />
      </div>
    );
  }
}

const mapStateToProps = ({ inventory, world }) => ({ inventory, world });

export default connect(mapStateToProps)(Inventory);
