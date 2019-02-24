import React, { Component } from 'react';
import ReactTimeout         from 'react-timeout';
import { connect }          from 'react-redux';

import { SNACK_DURATION } from '../../config/constants';

import './styles.scss';

class Snackbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: ''
    };

    this.handleHideSnack = this.handleHideSnack.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    const { itemReceived, itemDropped, notEnoughGold, tooManyItems } = this.props.snackbar;
    const lastItemReceived = prevProps.snackbar.itemReceived;
    const lastItemDropped = prevProps.snackbar.itemDropped;
    const lastNotEnoughGold = prevProps.snackbar.notEnoughGold;
    const lastTooManyItems = prevProps.snackbar.tooManyItems;

    if(lastItemDropped !== itemDropped && itemDropped &&
      typeof itemDropped !== "undefined") {
      // see if any items were dropped
      this.setState({ show: `LOST AN ITEM: ${itemDropped.split('-')[0]}` });
      this.props.setTimeout(this.handleHideSnack, SNACK_DURATION);
    }
    else if(lastItemReceived !== itemReceived && itemReceived &&
      typeof itemReceived !== "undefined") {
      // see if any items were received
      this.setState({ show: `GOT NEW ITEM: ${itemReceived.split('-')[0]}` });
      this.props.setTimeout(this.handleHideSnack, SNACK_DURATION);
    }
    else if(lastNotEnoughGold !== notEnoughGold && notEnoughGold &&
      typeof notEnoughGold !== "undefined") {
      // see if player tried to buy item without enough gold
      this.setState({ show: `NOT ENOUGH GOLD FOR: ${notEnoughGold.split('-')[0]}` });
      this.props.setTimeout(this.handleHideSnack, SNACK_DURATION);
    }
    else if(lastTooManyItems !== tooManyItems && tooManyItems &&
      typeof tooManyItems !== "undefined") {
      // see if player tried to get item with full inventory
      this.setState({ show: `NOT ENOUGH SPACE FOR: ${tooManyItems.split('-')[0]}` });
      this.props.setTimeout(this.handleHideSnack, SNACK_DURATION);
    }
  }

  handleHideSnack() {
    this.setState({ show: '' });
  }

  render() {
    const { sideMenu, largeView } = this.props;
    const { show } = this.state;

    let width;
    if(sideMenu) width = 180;
    else if(largeView) width = 400;
    else width = 350;

    return(
      <div className='snackbar__container white-border'
        style={{
          marginLeft: sideMenu ? 8 : 0,
          top: sideMenu ? 230 : 100,
          width,
          fontSize: sideMenu ? 18 : 20,
          opacity: show === '' ? 0 : 1,
          zIndex: show === '' ? 0 : 101,
          transition: show === '' ?
            'opacity .35s ease-in-out, z-index .35s step-end'
            :
            'opacity .35s ease-in-out, z-index .35s step-start'
        }}>
        <span className='snackbar__text'>
          { show }
        </span>
      </div>
    );
  }
}

const mapStateToProps = ({ snackbar }) => ({ snackbar });

export default connect(mapStateToProps)(ReactTimeout(Snackbar));
