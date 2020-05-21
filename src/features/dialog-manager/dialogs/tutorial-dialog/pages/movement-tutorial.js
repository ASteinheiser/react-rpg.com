import React from 'react';
import { isMobile } from 'react-device-detect';

import ArrowKeys from './assets/keyboard/arrow_keys.png';
import WASDKeys from './assets/keyboard/wasd_keys.png';
import Swipe from './assets/swipe.png';

import './styles.scss';

const MovementTutorial = () => {
    return (
        <div className="flex-column tutorial-page__container">
            <div className="tutorial-page__title centered">{'MOVEMENT'}</div>
            <div className="tutorial-page__movement">
                {isMobile ? (
                    <>
                        {'Move the player by swiping in a direction.'}
                        <center>
                            <img src={Swipe} alt="swipe" width={150} />
                        </center>
                    </>
                ) : (
                    <>
                        {'Move the player with WASD'}{' '}
                        <center>
                            <img src={WASDKeys} alt="wasd-keys" width={150} />
                        </center>
                        {'Or with the arrow keys'}{' '}
                        <center>
                            <img src={ArrowKeys} alt="arrow-keys" width={150} />
                        </center>
                    </>
                )}
            </div>
        </div>
    );
};

export default MovementTutorial;
