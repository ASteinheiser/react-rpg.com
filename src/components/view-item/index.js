import React, { Component } from 'react';

import Button      from '../button';
import MicroDialog from '../micro-dialog';

import './styles.css';

class ViewItem extends Component {
  render() {
    console.log(this.props);
    return(
      <MicroDialog>
        <span className='game-over-title'>
          {'ITEM NAME'}
        </span>
      </MicroDialog>
    );
  }
}

export default ViewItem;
