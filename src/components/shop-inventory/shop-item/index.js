import React from 'react';

import EmptySlot from '../../empty-slot';

import './styles.scss';

const ShopItem = ({ item, buyItem }) => {
  return(
    <button onClick={buyItem}
      className='shop-item__container white-border flex-row'>

      <EmptySlot style={{borderRight: '1px solid'}}>
        <div className='shop-item__slot'
          style={{ backgroundImage: `url('${item.image}')` }} />
      </EmptySlot>

      <div className='flex-row shop-item__text'>
        <span className='flex-row shop-item__title'>
          { item.name }
        </span>

        <span className='flex-row shop-item__price'>
          { item.value }
        </span>
      </div>
    </button>
  );
};

export default ShopItem;