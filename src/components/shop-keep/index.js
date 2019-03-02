import React from 'react';

import ShopKeepSprite from './shop-keep.png';

import './styles.scss';

const ShopKeep = () => {
  return (
    <div className='shop-keep-animated'
      style={{backgroundImage: `url(${ShopKeepSprite})`}}/>
  );
};

export default ShopKeep;
