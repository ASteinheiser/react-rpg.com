import { useEffect } from 'react';
import { connect } from 'react-redux';
import Hammer from 'hammerjs';
import _debounce from 'lodash.debounce';

import attackMonster from './actions/attack-monster';
import movePlayer from './actions/move-player';
import castSpell from './actions/cast-spell';
import isGamePaused from '../dialog-manager/actions/is-game-paused';
import toggleInventory from '../dialog-manager/actions/toggle-inventory';
import abilityScoreDialog from '../dialog-manager/actions/ability-score-dialog';
import toggleJournal from '../dialog-manager/actions/toggle-journal';
import toggleSettings from '../dialog-manager/actions/toggle-settings';
import toggleSpellbookDialog from '../dialog-manager/actions/toggle-spellbook-dialog';

import {
    ANIMATION_SPEED,
    W_KEY,
    S_KEY,
    A_KEY,
    D_KEY,
    U_KEY,
    I_KEY,
    J_KEY,
    C_KEY,
    B_KEY,
    UP_KEY,
    DOWN_KEY,
    LEFT_KEY,
    RIGHT_KEY,
    SPACE_KEY,
    ESC_KEY,
} from '../../config/constants';

const ANIMATION_WITH_PADDING = ANIMATION_SPEED * 1.25;

let intervalId = null;

const Controls = ({
    isGamePaused,
    attackMonster,
    castSpell,
    movePlayer,
    toggleInventory,
    toggleJournal,
    abilityScoreDialog,
    toggleSettings,
    toggleSpellbookDialog,
}) => {
    const _handleKeyDown = _debounce(
        event => {
            // if the game is not paused by dialogs
            if (!isGamePaused()) handleKeyDown(event);
        },
        ANIMATION_WITH_PADDING,
        { maxWait: ANIMATION_WITH_PADDING, leading: true, trailing: false }
    );

    const _swipe = _debounce(
        ({ direction, offsetDirection }) => {
            // return if the game is paused by dialogs
            if (isGamePaused()) return;
            // if we get a bad pan, use the best guess
            if (direction === 1) direction = offsetDirection;

            switch (direction) {
                case 8:
                    movePlayer('NORTH');
                    break;
                case 16:
                    movePlayer('SOUTH');
                    break;
                case 2:
                    movePlayer('WEST');
                    break;
                case 4:
                    movePlayer('EAST');
                    break;
                default:
            }
        },
        ANIMATION_WITH_PADDING,
        { maxWait: ANIMATION_WITH_PADDING, leading: true, trailing: false }
    );

    const _swipeHold = _debounce(
        ({ direction, offsetDirection }) => {
            // return if the game is paused by dialogs or in settings mode
            if (isGamePaused()) return;
            // if we get a bad pan, use the best guess
            if (direction === 1) direction = offsetDirection;

            intervalId = setInterval(() => {
                switch (direction) {
                    case 8:
                        movePlayer('NORTH');
                        break;
                    case 16:
                        movePlayer('SOUTH');
                        break;
                    case 2:
                        movePlayer('WEST');
                        break;
                    case 4:
                        movePlayer('EAST');
                        break;
                    default:
                }
            }, ANIMATION_WITH_PADDING);
        },
        ANIMATION_WITH_PADDING,
        { maxWait: ANIMATION_WITH_PADDING, leading: true, trailing: false }
    );

    const _tap = _debounce(
        () => {
            // if the game is not paused by dialogs
            if (!isGamePaused()) attackMonster();
        },
        ANIMATION_WITH_PADDING,
        { maxWait: ANIMATION_WITH_PADDING, leading: true, trailing: false }
    );

    const _clearInterval = () => {
        clearInterval(intervalId);
    };

    useEffect(() => {
        // enable keyboard for player controls
        window.addEventListener('keydown', _handleKeyDown);
        // enable touch for player controls
        const hammertime = new Hammer(document.getElementById('window'));
        // settings for touch controls
        hammertime.get('pan').set({ direction: Hammer.DIRECTION_ALL });
        hammertime.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
        hammertime.get('tap').set({ taps: 2 });
        // bind touch control functions
        hammertime.on('swipe', _swipe);
        hammertime.on('panend', _clearInterval);
        hammertime.on('panstart', _swipeHold);
        hammertime.on('tap', _tap);
        // make sure to unbind all listeners on unmount
        return () => {
            window.removeEventListener('keydown', _handleKeyDown);
            hammertime.off('swipe', _swipe);
            hammertime.off('panend', _clearInterval);
            hammertime.off('panstart', _swipeHold);
            hammertime.off('tap', _tap);
        };
    }, []);

    function handleKeyDown(event) {
        event.preventDefault();
        // move with 'WASD' or Arrow keys,
        // attack with 'SPACE',
        // open inventory with 'I',
        // open ability dialog with 'U'
        switch (event.keyCode) {
            case LEFT_KEY:
            case A_KEY:
                return movePlayer('WEST');
            case UP_KEY:
            case W_KEY:
                return movePlayer('NORTH');
            case RIGHT_KEY:
            case D_KEY:
                return movePlayer('EAST');
            case DOWN_KEY:
            case S_KEY:
                return movePlayer('SOUTH');
            case SPACE_KEY:
                return attackMonster();
            case C_KEY:
                return castSpell();
            case I_KEY:
                return toggleInventory();
            case J_KEY:
                return toggleJournal();
            case U_KEY:
                return abilityScoreDialog(false);
            case ESC_KEY:
                return toggleSettings();
            case B_KEY:
                return toggleSpellbookDialog();
            default:
        }
    }

    return null;
};

const actions = {
    attackMonster,
    castSpell,
    movePlayer,
    isGamePaused,
    toggleInventory,
    toggleJournal,
    abilityScoreDialog,
    toggleSettings,
    toggleSpellbookDialog,
};

export default connect(null, actions)(Controls);
