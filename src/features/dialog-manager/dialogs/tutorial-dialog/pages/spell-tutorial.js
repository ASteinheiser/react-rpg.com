import React from 'react';
import { isMobile } from 'react-device-detect';

import BKey from './assets/keyboard/b_key.png';
import CKey from './assets/keyboard/c_key.png';
import Fireball from './assets/fireball.png';

import './styles.scss';

const SpellTutorial = () => {
    return (
        <div className="flex-column tutorial-spell__container">
            <div className="tutorial-page__title">{'SPELLS'}</div>
            <div className="tutorial-page__spell">
                {
                    'Spells are powerful and require mana to cast. Different spells unlock at different levels.'
                }
                <br />
                <br />
                {isMobile ? (
                    <>
                        {
                            'Open the spellbook and cast spells with the on-screen buttons'
                        }
                        <div className="flex-row tutorial-page__spell-icons">
                            <i
                                className="fa fa-book-open white-border"
                                style={{ fontSize: '65px', padding: '15px' }}
                            />
                            <img
                                className="white-border"
                                src={Fireball}
                                alt="fireball"
                                width={100}
                            />
                        </div>
                    </>
                ) : (
                    <>
                        {"Open the spellbook with 'B' and cast spells with 'C'"}
                        <div className="flex-row tutorial-page__spell-icons">
                            <img src={BKey} alt="b key" width={100} />
                            <img src={CKey} alt="c key" width={100} />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default SpellTutorial;
