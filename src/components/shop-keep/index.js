import React, { Component } from 'react';

import ShopKeepSprite from './shop-keep.png';

import './styles.css';

export default class ShopKeep extends Component {
  render() {
    return (
      <div className='shop-keep-animated'
        style={{backgroundImage: `url(${ShopKeepSprite})`}}/>
    );
  }
}
