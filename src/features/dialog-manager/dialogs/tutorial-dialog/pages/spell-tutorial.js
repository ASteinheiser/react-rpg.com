import React from 'react';

import BKey from './assets/keyboard/b_key.png';
import CKey from './assets/keyboard/c_key.png';

import './styles.scss';

const SpellTutorial = () => {
    return (
        <div className="flex-column tutorial-spell__container">
            <div className="tutorial-page__title">{'SPELLS'}</div>
            <div className="tutorial-page__spell">
                {'Spells are powerful, but require mana.'}
                <br />
                <br />
                {
                    "Open the spellbook with 'B' or the button on the top-right of the screen."
                }
                <br />
                <center>
                    <img src={BKey} alt="b key" width={75} />
                </center>
                {
                    "Cast spells with 'C' or the button on the top-right of the screen."
                }
                <center>
                    <img src={CKey} alt="c key" width={75} />
                </center>
            </div>
        </div>
    );
};

export default SpellTutorial;
