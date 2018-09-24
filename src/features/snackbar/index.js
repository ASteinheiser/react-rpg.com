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
    console.log(prevProps);
    console.log(this.props);
    let prevItems = prevProps.inventory.items;
    let currItems = this.props.inventory.items;
    // if the last inventory was larger, we lost an item
    if(prevItems.length > currItems.length) {
      console.log('lost item');
      // get item name from last items
      this.setState({ show: prevItems[prevItems.length - 1].name + ' was removed from your inventory...' });
      this.props.setTimeout(this.handleHideSnack, ANIMATION_SPEED * 2);
    }
    // if the last inventory was small, we got an item
    else if(prevItems.length < currItems.length) {
      console.log('got item');
      // get item name from curr items
      this.setState({ show: currItems[currItems.length - 1].name + ' was added to your inventory!' });
      this.props.setTimeout(this.handleHideSnack, ANIMATION_SPEED * 2);
    }
  }

  handleHideSnack() {
    // this.setState({ show: '' });
  }

  render() {
    const { show } = this.state;
    const { items } = this.props.inventory;

    return(
      <div key={items.length > 0 ? items[items.length - 1].name : 'item'}
        className='snackbar-container'
        style={{

        }}>
        { show }
      </div>
    );
  }
}

const mapStateToProps = ({ inventory }) => {
  return { inventory }
}

export default connect(mapStateToProps)(ReactTimeout(Snackbar));
