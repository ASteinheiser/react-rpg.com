import React, { Component } from 'react';
import { connect }          from 'react-redux';

import Button from '../../components/button';
import store  from '../../config/store';

import './styles.scss';

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
          pause: true,
          inventory: true
        }
      });
    });
  }

  handleCloseInventory() {
    store.dispatch({
      type: 'PAUSE',
      payload: { pause: false }
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { inventory } = this.props.dialog;
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
    const { disabled, dialog, sideMenu } = this.props;

    const open = dialog.inventory;

    return (
      <div className='flex-row inventory__container'>
        {
          !disabled &&
            <Button
              small={sideMenu}
              indicator={newItemIndicator}
              onClick={open ?
                this.handleCloseInventory.bind(this) : this.handleOpenInventory.bind(this)}
              icon={open ?
                'times' : 'briefcase'}
              iconStyle={open ?
                {fontSize: 22} : {fontSize: sideMenu ? 20 : 23}}
              title={open ?
                'Close' : 'Inventory'}
              style={{
                width: 'fit-content',
                transition: 'width .25s ease-out',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
              }} />
        }
      </div>
    );
  }
}

const mapStateToProps = ({ inventory, dialog }) => ({ inventory, dialog });

export default connect(mapStateToProps)(Inventory);
