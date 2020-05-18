import React from 'react';

import './styles.scss';

const AbilityTutorial = () => {
    return (
        <div className="flex-column tutorial-ability__container">
            <div className="tutorial-page__title">{'ABILITIES'}</div>
            <div className="tutorial-page__ability">
                <span className="tutorial-page__ability-name">
                    {'STRENGTH'}
                </span>
                <br />
                <span className="tutorial-page__ability-description">
                    Affects attack for melee weapons.
                </span>
            </div>
            <div className="tutorial-page__ability">
                <span className="tutorial-page__ability-name">
                    {'CONSTITUTION'}
                </span>
                <br />
                <span className="tutorial-page__ability-description">
                    Increases player health.
                </span>
            </div>
            <div className="tutorial-page__ability">
                <span className="tutorial-page__ability-name">
                    {'DEXTERITY'}
                </span>
                <br />
                <span className="tutorial-page__ability-description">
                    Increases defence and affects attack for ranged weapons.
                </span>
            </div>
            <div className="tutorial-page__ability">
                <span className="tutorial-page__ability-name">
                    {'CHARISMA'}
                </span>
                <br />
                <span className="tutorial-page__ability-description">
                    Affects buy and sell prices in the shop.
                </span>
            </div>
            <div className="tutorial-page__ability">
                <span className="tutorial-page__ability-name">
                    {'INTELLIGENCE'}
                </span>
                <br />
                <span className="tutorial-page__ability-description">
                    Increases mana and affects attack for spells.
                </span>
            </div>
            <div className="tutorial-page__ability">
                <span className="tutorial-page__ability-name">{'WISDOM'}</span>
                <br />
                <span className="tutorial-page__ability-description">
                    Affects health and mana restored from potions.
                </span>
            </div>
        </div>
    );
};

export default AbilityTutorial;
