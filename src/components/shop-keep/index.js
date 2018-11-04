import React from 'react';

import ShopKeepSprite from './shop-keep.png';

import './styles.css';

const ShopKeep = (props) => {
  return (
    <div className='shop-keep-animated'
      style={{backgroundImage: `url(${ShopKeepSprite})`}}/>
  );
}

export default ShopKeep;
