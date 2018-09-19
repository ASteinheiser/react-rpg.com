import React, { Component } from 'react';

import Button         from '../button';
import Dialog         from '../dialog';
import ShopKeepSprite from './shop-keep.png';
import store          from '../../config/store';

import './styles.css';

export default class ShopDialog extends Component {

  handleCloseDialog() {
    store.dispatch({
      type: 'PAUSE',
      payload: { component: false }
    })
  }

  render() {
    return(
      <Dialog>
        <div className='flex-column shop-container'>

          <span className='shop-title-text'>{'Shop'}</span>

          <div className='flex-row shop-container'>
            <div className='flex-column shop-container-child'>
              <div className='shop-keep-animated'
                style={{backgroundImage: `url(${ShopKeepSprite})`}}/>
            </div>

            <div className='flex-column shop-container-child'>
              <div>
                {'Shop inventory!!'}
              </div>
            </div>
          </div>

          <div className='flex-row shop-button-container'>
            <Button
              onClick={this.handleCloseDialog.bind(this)}
              icon='walking'
              title={'Leave Shop'} />
          </div>
        </div>
      </Dialog>
    );
  }
}
