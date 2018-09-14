import React, { Component } from 'react';

import Button      from '../button';
import MicroDialog from '../micro-dialog';

import './styles.css';

class ViewItem extends Component {
  render() {
    const { data } = this.props;

    return(
      <MicroDialog onClose={this.props.onClose}>
        <div className='view-item-text-container'>
          <div style={{
              backgroundImage: `url('${data.image}')`,
              backgroundSize: 'contain',
              width: '60px',
              height: '60px'
            }} />
          <span className='view-item-text'>
            { data.name || '-' }
          </span>
        </div>

        <div className='flex-column view-item-buttons-parent'>
          <div className='flex-row view-item-buttons-child'>
            <Button title={'Drop'} />
            <Button title={'Equip'} />
          </div>
        </div>
      </MicroDialog>
    );
  }
}

export default ViewItem;
