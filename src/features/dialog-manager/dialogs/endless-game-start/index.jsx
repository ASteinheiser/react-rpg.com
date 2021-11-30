import React from 'react';
import { connect } from 'react-redux';

import Button from '../../../../components/button';
import Dialog from '../../../../components/dialog';
import backToSelect from '../../actions/back-to-select';
import toggleTutorial from '../../actions/toggle-tutorial';
import startEndlessGame from '../../../world/actions/start-endless-game';

import './styles.scss';

const EndlessGameStart = ({
    backToSelect,
    toggleTutorial,
    startEndlessGame,
}) => {
    return (
        <Dialog goBack={backToSelect} onKeyPress={startEndlessGame}>
            <span className="flex-row endless-start__title">
                {'Endless Mode'}
            </span>

            <span className="flex-column endless-start__text">
                {
                    'Up for a challenge...? These randomly generated dungeons will run you into oblivion.'
                }
            </span>

            <div className="flex-column game-start__button">
                <Button
                    onClick={toggleTutorial}
                    icon="question-circle"
                    title={'How To Play'}
                />
            </div>

            <div className="flex-column endless-start__button">
                <Button
                    onClick={startEndlessGame}
                    icon="compass"
                    title={'Explore Dungeon'}
                />
            </div>
        </Dialog>
    );
};

const actions = { backToSelect, toggleTutorial, startEndlessGame };

export default connect(null, actions)(EndlessGameStart);
