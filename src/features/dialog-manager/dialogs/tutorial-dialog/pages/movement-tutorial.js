import React from 'react';

import ArrowKeys from './assets/keyboard/arrow_keys.png';
import WASDKeys from './assets/keyboard/wasd_keys.png';

import './styles.scss';

const MovementTutorial = () => {
    return (
        <div className="flex-column tutorial-page__container">
            <div className="tutorial-page__title centered">{'MOVEMENT'}</div>
            <div className="tutorial-page__movement">
                {'Move the player with WASD'}{' '}
                <center>
                    <img src={WASDKeys} alt="wasd-keys" width={150} />
                </center>
                {'Or with the arrow keys'}{' '}
                <center>
                    <img src={ArrowKeys} alt="arrow-keys" width={150} />
                </center>
            </div>
        </div>
    );
};

export default MovementTutorial;
