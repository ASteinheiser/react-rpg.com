import React from 'react';
import { connect } from 'react-redux';

import GameMusic from './game-music';
import GameSettings from './game-settings';
import Inventory from '../inventory';
import Snackbar from '../snackbar';
import Stats from '../stats';
import Journal from '../journal';

import './styles.scss';

const GameMenus = ({ appState, dialog }) => {
    const { sideMenu, largeView } = appState;
    const {
        gameOver,
        gameStart,
        paused,
        inventory,
        journalDialog,
        settings,
    } = dialog;

    // disable the inventory button when we are in settings or paused and not in the inventory
    const disableInventory =
        settings || (paused && !inventory && !journalDialog);
    // disable the stats view when in game start or game over or settings
    const disableStats = gameStart || gameOver || settings;

    const disableJournal = disableInventory;

    return (
        <div className="flex-row centered">
            <div
                className={`game-menu__container ${
                    sideMenu ? 'flex-column' : 'flex-row'
                }`}
                style={{
                    maxWidth: largeView ? 400 : 350,
                    paddingLeft: sideMenu ? 8 : 0,
                    top: sideMenu ? -11 : 0,
                    height: sideMenu ? '380px' : 'unset',
                    justifyContent: disableInventory ? 'flex-end' : 'center',
                }}
            >
                <Stats
                    largeView={largeView}
                    sideMenu={sideMenu}
                    disabled={disableStats}
                />

                <Inventory sideMenu={sideMenu} disabled={disableInventory} />
                <Journal sideMenu={sideMenu} disabled={disableJournal} />

                <Snackbar largeView={largeView} sideMenu={sideMenu} />

                <div className="flex-column">
                    <GameMusic sideMenu={sideMenu} />
                    <GameSettings />
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = ({ appState, dialog }) => ({ appState, dialog });

export default connect(mapStateToProps)(GameMenus);
