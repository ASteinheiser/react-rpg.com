import React from 'react';

import Chest from './assets/chest.png';
import Shop from './assets/shop.png';

import Broadsword from '../../../../../data/items/weapons/swords/broad-sword/broad-sword.png';
import HealthPotion from '../../../../../data/items/potions/hp-potion/hp-potion.png';
import SteelArmour from '../../../../../data/items/clothes/armor/steel-armor/steel-armor.png';
import Crossbow from '../../../../../data/items/weapons/ranged/crossbow/crossbow.png';
import ManaPotion from '../../../../../data/items/potions/mp-potion/mp-potion.png';
import AmethystRing from '../../../../../data/items/rings/amethyst-ring/amethyst-ring.png';

import './styles.scss';

const ItemTutorial = () => {
    return (
        <div className="flex-column tutorial-item__container">
            <div className="tutorial-page__title">{'ITEMS'}</div>
            <div className="tutorial-page__item">
                {
                    'Items can be found in chests scattered around each \
                level or bought at shops. '
                }{' '}
                <br />
                <div className="tutorial-page__item-locations">
                    <img src={Chest} alt="chest" width={50} />
                    <img src={Shop} alt="shop" width={50} />
                </div>
                {
                    'Several types of items exist, such as armour, weapons and potions.'
                }
                <div className="tutorial-page__item-types">
                    <img src={Broadsword} alt="broadsword" width={50} />
                    <img src={HealthPotion} alt="health potion" width={50} />
                    <img src={SteelArmour} alt="steel armour" width={50} />
                    <img src={Crossbow} alt="crossbow" width={50} />
                    <img src={ManaPotion} alt="mana potion" width={50} />
                    <img src={AmethystRing} alt="amethyst ring" width={50} />
                </div>
                {
                    'Different items provide different stats, or can be sold for gold. Potions can be consumed to restore health or mana.'
                }
            </div>
        </div>
    );
};

export default ItemTutorial;
