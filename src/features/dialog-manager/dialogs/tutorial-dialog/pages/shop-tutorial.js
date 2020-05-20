import React from 'react';

import ShopKeep from '../../../../../components/shop-keep';

import './styles.scss';

const ShopPage = () => {
    return (
        <div className="flex-column tutorial-shop__container">
            <div className="tutorial-page__title">{'SHOPS'}</div>
            <div className={`flex-row`}>
                <ShopKeep small />
                <div className="tutorial-page__shop">
                    {'Shops are found on every second floor.'}
                    <br />
                    <br />
                    {'Items are unlocked in tiers, dependent on player level.'}
                    <br />
                </div>
            </div>
            <div className="tutorial-page__shop-tiers">
                {'Tier 1: Levels 1 -> 9'}
                <br />
                {'Tier 2: Levels 10 -> 19'}
                <br />
                {'Tier 3: Levels 20 -> 29'}
                <br />
                {'Tier 4: Levels 30 and above'}
                <br />
            </div>
        </div>
    );
};

export default ShopPage;
