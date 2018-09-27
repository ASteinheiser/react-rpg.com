import React, { Component } from 'react';
import ReactTimeout         from 'react-timeout';
import { connect }          from 'react-redux';

import { ANIMATION_SPEED } from '../../config/constants';

import './styles.css';

class Snackbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: ''
    };

    this.handleHideSnack = this.handleHideSnack.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    const { itemReceived, itemDropped } = this.props.inventory;
    let lastItemReceived = prevProps.inventory.itemReceived;
    let lastItemDropped = prevProps.inventory.itemDropped;

    if(lastItemDropped !== itemDropped && itemDropped && itemDropped !== undefined) {
      // see if any items were dropped
      this.setState({ show: 'LOST AN ITEM: ' + itemDropped.split('-')[0] });
      this.props.setTimeout(this.handleHideSnack, ANIMATION_SPEED * 5);
    }
    else if(lastItemReceived !== itemReceived && itemReceived && itemReceived !== undefined) {
      // see if any items were received
      this.setState({ show: 'GOT NEW ITEM: ' + itemReceived.split('-')[0] });
      this.props.setTimeout(this.handleHideSnack, ANIMATION_SPEED * 5);
    }
    else if(prevProps.snackbar.notEnoughGold !== this.props.snackbar.notEnoughGold &&
             this.props.snackbar.notEnoughGold && this.props.snackbar.notEnoughGold !== undefined) {
      // see if player tried to buy item without enough gold
      this.setState({ show: 'NOT ENOUGH GOLD FOR: ' + this.props.snackbar.notEnoughGold.split('-')[0] });
      this.props.setTimeout(this.handleHideSnack, ANIMATION_SPEED * 5);
    }
    else if(prevProps.inventory.tooManyItems !== this.props.inventory.tooManyItems &&
              this.props.inventory.tooManyItems && this.props.inventory.tooManyItems !== undefined) {
      // see if player tried to get item with full inventory
      this.setState({ show: 'NOT ENOUGH SPACE FOR: ' + this.props.inventory.tooManyItems.split('-')[0] });
      this.props.setTimeout(this.handleHideSnack, ANIMATION_SPEED * 5);
    }
  }

  handleHideSnack() {
    this.setState({ show: '' });
  }

  render() {
    const { show } = this.state;

    return(
      <div className='snackbar-container white-border'
        style={{
          opacity: show === '' ? 0 : 1,
          zIndex: show === '' ? 0 : 101,
          transition: show === '' ?
            'opacity .35s ease-in-out, z-index .35s step-end'
            :
            'opacity .35s ease-in-out, z-index .35s step-start'
        }}>
        <span className='snackbar-text'>
          { show }
        </span>
      </div>
    );
  }
}

const mapStateToProps = ({ inventory, snackbar }) => {
  return { inventory, snackbar }
}

export default connect(mapStateToProps)(ReactTimeout(Snackbar));
