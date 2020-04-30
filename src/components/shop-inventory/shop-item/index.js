import React from 'react';

import EmptySlot from '../../empty-slot';
import calculatePrices from '../../../utils/calculate-prices';

import './styles.scss';

const ShopItem = ({ item, buyItem, charismaModifier }) => {
    const { buyPrice } = calculatePrices(item.value, charismaModifier);

    return (
        <button
            onClick={buyItem}
            className="shop-item__container white-border flex-row"
        >
            <EmptySlot style={{ borderRight: '1px solid' }}>
                <div
                    className="shop-item__slot"
                    style={{ backgroundImage: `url('${item.image}')` }}
                />
            </EmptySlot>

            <div className="flex-row shop-item__text">
                <span className="flex-row shop-item__title">{item.name}</span>

                <span className="flex-row shop-item__price">{buyPrice}</span>
            </div>
        </button>
    );
};

export default ShopItem;
