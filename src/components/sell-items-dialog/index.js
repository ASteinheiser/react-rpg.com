import React, { Component } from 'react';

import { EmptySlot } from '../equipped-items';
import MicroDialog   from '../micro-dialog';

import './styles.css';

class SellItemsDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      viewItem: null
    };
  }

  handleViewItem(item) {
    // this.setState({ viewItem: <ViewItem data={item} onClose={this.handleCloseItem.bind(this)} /> });
  }

  handleCloseItem() {
    this.setState({ viewItem: null });
  }

  render() {
    const { viewItem } = this.state;

    return(
      <MicroDialog onClose={this.props.onClose}>

        { viewItem }

        <div className='flex-row sell-items-title'>
          <span> {'Sell'} </span>
        </div>

        <div className='flex-column sell-items-container'>
          <div className='flex-row'>
            <EmptySlot>
            </EmptySlot>
            <EmptySlot>
            </EmptySlot>
            <EmptySlot>
            </EmptySlot>
            <EmptySlot>
            </EmptySlot>
          </div>
          <div className='flex-row'>
            <EmptySlot>
            </EmptySlot>
            <EmptySlot>
            </EmptySlot>
            <EmptySlot>
            </EmptySlot>
            <EmptySlot>
            </EmptySlot>
          </div>
        </div>

      </MicroDialog>
    );
  }
}

export default SellItemsDialog;
