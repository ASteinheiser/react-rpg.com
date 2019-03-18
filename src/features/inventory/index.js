import React, { Component } from 'react';
import { connect }          from 'react-redux';

import Button          from '../../components/button';
import toggleInventory from '../dialog-manager/actions/toggle-inventory';

import './styles.scss';

class Inventory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newItemIndicator: false
    };

    this._toggleInventory = this._toggleInventory.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    const { inventory } = this.props.dialog;
    const { itemReceived, itemDropped } = this.props.snackbar;
    const lastItemReceived = prevProps.snackbar.itemReceived;
    const lastItemDropped = prevProps.snackbar.itemDropped;

    if(lastItemDropped !== itemDropped && itemDropped &&
      typeof itemDropped !== "undefined" && !inventory) {
      // see if any items were dropped
      this.setState({ newItemIndicator: true });
    }
    else if(lastItemReceived !== itemReceived && itemReceived &&
      typeof itemReceived !== "undefined" && !inventory) {
      // see if any items were received
      this.setState({ newItemIndicator: true });
    }
  }

  handleKeyDown(event) {
    switch(event.keyCode) {
      case 13:
      case 32:
        // Don't toggle the inventory visibility with any of these keys
        // because right now, they're being used for the attack order.
        event.preventDefault();
        break;
      default:
    }
  }

  _toggleInventory() {
    // We can turn off the indicator if the inventory is opened
    // If we are closing the inventory, it is okay to turn off
    // indicator since it should be false already
    this.setState({ newItemIndicator: false });
    this.props.toggleInventory();
  }

  render() {
    const { newItemIndicator } = this.state;
    const { disabled, dialog, sideMenu } = this.props;

    const open = dialog.inventory;

    return (
      <div className='flex-row inventory__container'>
        {
          !disabled &&
            <Button
              small={sideMenu}
              indicator={newItemIndicator}
              onClick={this._toggleInventory}
              onKeyDown={this.handleKeyDown}
              icon={open ?
                'times' : 'briefcase'}
              iconStyle={open ?
                {fontSize: 22} : {fontSize: sideMenu ? 20 : 23}}
              title={open ?
                'Close' : 'Inventory'}
              style={{
                width: open ? 135 : 195,
                transition: 'width .25s ease-out',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                backgroundColor: 'var(--dark-gray)'
              }} />
        }
      </div>
    );
  }
}

const mapStateToProps = ({ snackbar, dialog }) => ({ snackbar, dialog });

const actions = { toggleInventory };

export default connect(mapStateToProps, actions)(Inventory);
