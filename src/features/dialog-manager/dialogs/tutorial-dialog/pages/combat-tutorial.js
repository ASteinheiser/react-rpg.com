import React from 'react';
import { isMobile } from 'react-device-detect';

import Spacebar from './assets/keyboard/space_key.png';
import DoubleTap from './assets/double-tap.png';

import './styles.scss';

const CombatTutorial = () => {
    return (
        <div className="flex-column tutorial-combat__container">
            <div className="tutorial-page__title">{'COMBAT'}</div>
            <div className="tutorial-page__combat">
                {isMobile ? (
                    <>
                        {'Attack your enemies by double-tapping'} <br />
                        <div className="tutorial-page__combat-buttons">
                            <img src={DoubleTap} alt="double-tap" width={50} />
                        </div>
                    </>
                ) : (
                    <>
                        {"Attack your enemies with 'Spacebar'"} <br />
                        <div className="tutorial-page__combat-buttons">
                            <img src={Spacebar} alt="spacebar" width={100} />
                        </div>
                    </>
                )}
                {
                    'To hit enemies, your attack must match or exceed their defence. Your attack is equal to a d20 + STR/DEX/INT, depending on whether the attack is melee, ranged or spell. Defence is a combination of your armour and DEX.'
                }
            </div>
        </div>
    );
};

export default CombatTutorial;
