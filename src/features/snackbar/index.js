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
    const { itemReceived, itemDropped } = this.props.inventory;
    let lastItemReceived = prevProps.inventory.itemReceived;
    let lastItemDropped = prevProps.inventory.itemDropped;

    if(lastItemDropped !== itemDropped && itemDropped && itemDropped !== undefined) {
      // see if any items were dropped
      this.setState({ show: 'LOST AN ITEM: ' + itemDropped.split('-')[0] });
      this.props.setTimeout(this.handleHideSnack, SNACK_DURATION);
    }
    else if(lastItemReceived !== itemReceived && itemReceived && itemReceived !== undefined) {
      // see if any items were received
      this.setState({ show: 'GOT NEW ITEM: ' + itemReceived.split('-')[0] });
      this.props.setTimeout(this.handleHideSnack, SNACK_DURATION);
    }
    else if(prevProps.snackbar.notEnoughGold !== this.props.snackbar.notEnoughGold &&
             this.props.snackbar.notEnoughGold && this.props.snackbar.notEnoughGold !== undefined) {
      // see if player tried to buy item without enough gold
      this.setState({ show: 'NOT ENOUGH GOLD FOR: ' + this.props.snackbar.notEnoughGold.split('-')[0] });
      this.props.setTimeout(this.handleHideSnack, SNACK_DURATION);
    }
    else if(prevProps.inventory.tooManyItems !== this.props.inventory.tooManyItems &&
              this.props.inventory.tooManyItems && this.props.inventory.tooManyItems !== undefined) {
      // see if player tried to get item with full inventory
      this.setState({ show: 'NOT ENOUGH SPACE FOR: ' + this.props.inventory.tooManyItems.split('-')[0] });
      this.props.setTimeout(this.handleHideSnack, SNACK_DURATION);
    }
  }

  handleHideSnack() {
    this.setState({ show: '' });
  }

  render() {
    const { sideMenu } = this.props;
    const { show } = this.state;

    return(
      <div className='snackbar-container white-border'
        style={{
          paddingLeft: sideMenu ? 4 : 0,
          top: sideMenu ? 230 : 100,
          width: sideMenu ? 180 : 380,
          fontSize: sideMenu ? 18 : 20,
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
