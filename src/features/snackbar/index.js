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
    // see if any items were dropped or received
    if(lastItemDropped !== itemDropped) {
      this.setState({ show: itemDropped + ' was removed from your inventory...' });
      this.props.setTimeout(this.handleHideSnack, ANIMATION_SPEED * 5);
    } else if(lastItemReceived !== itemReceived) {
      this.setState({ show: itemReceived + ' was added to your inventory!' });
      this.props.setTimeout(this.handleHideSnack, ANIMATION_SPEED * 5);
    } else if(prevProps.snackbar.notEnoughGold !== this.props.snackbar.notEnoughGold) {
      this.setState({ show: 'You do not have enough gold for ' + this.props.snackbar.notEnoughGold });
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
          zIndex: show === '' ? 0 : 101
        }}>
        { show }
      </div>
    );
  }
}

const mapStateToProps = ({ inventory, snackbar }) => {
  return { inventory, snackbar }
}

export default connect(mapStateToProps)(ReactTimeout(Snackbar));
