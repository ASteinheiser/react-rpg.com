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
        <Button
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
