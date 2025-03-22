import React from 'react';
import { connect } from 'react-redux';

import Button from '../../../../components/button';
import Dialog from '../../../../components/dialog';
import Flame from '../../../../components/flame';
import mainGameDialog from '../../actions/main-game-dialog';
import endlessGameDialog from '../../actions/endless-game-dialog';
import loadGame from '../../actions/load-game';

import './styles.scss';

const GameSelect = ({ mainGameDialog, endlessGameDialog, loadGame }) => {
    return (
        <Dialog>
            <span className="flex-row game-select__title align-center">
                <img
                    src="/logo-no-bg.png"
                    alt="React RPG: 2e"
                    style={{ width: 64, height: 64, marginRight: 8 }}
                />

                {'React RPG: 2e'}
            </span>

            <span className="flex-column game-select__text">
                {'Greetings, Traveler...'}
            </span>

            <div className="game-select__flame--1">
                <Flame />
            </div>
            <div className="game-select__flame--2">
                <Flame />
            </div>
            <div className="game-select__flame--3">
                <Flame />
            </div>

            <div className="flex-column game-select__button">
                <Button
                    style={{ marginBottom: 16 }}
                    onClick={mainGameDialog}
                    icon="torah"
                    title={'Story Mode'}
                />

                <Button
                    style={{ marginBottom: 16 }}
                    onClick={endlessGameDialog}
                    icon="infinity"
                    title={'Endless Mode'}
                />

                <Button
                    onClick={() => {
                        document.getElementById('load-game-dialog').click();
                    }}
                    icon="save"
                    title={'Load Game'}
                />
                <input
                    id={'load-game-dialog'}
                    style={{ display: 'none' }}
                    type={'file'}
                    onChange={event => {
                        loadGame(event.target.files[0]);
                    }}
                />
            </div>
        </Dialog>
    );
};

const actions = { mainGameDialog, endlessGameDialog, loadGame };

export default connect(null, actions)(GameSelect);
