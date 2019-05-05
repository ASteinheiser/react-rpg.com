import { useEffect } from 'react';
import { connect }   from 'react-redux';
import Hammer        from 'hammerjs';
import _debounce     from 'lodash.debounce';

import attackMonster       from './actions/attack-monster';
import movePlayer          from './actions/move-player';
import isGamePaused        from '../dialog-manager/actions/is-game-paused';
import { ANIMATION_SPEED } from '../../config/constants';

const ANIMATION_WITH_PADDING = ANIMATION_SPEED * 1.25;

let intervalId = null;

const Controls = ({ isGamePaused, attackMonster, movePlayer }) => {

  const _handleKeyDown = _debounce(event => {
    // if the game is not paused by dialogs
    if(!isGamePaused()) handleKeyDown(event);
  },
    ANIMATION_WITH_PADDING,
    { maxWait: ANIMATION_WITH_PADDING, leading: true, trailing: false }
  );

  const _swipe = _debounce(({ direction, offsetDirection }) => {
    // return if the game is paused by dialogs
    if(isGamePaused()) return;
    // if we get a bad pan, use the best guess
    if(direction === 1) direction = offsetDirection;

    switch(direction) {
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
        // console.log(`Unmapped pan direction ${direction}`);
    }
  },
    ANIMATION_WITH_PADDING,
    { maxWait: ANIMATION_WITH_PADDING, leading: true, trailing: false }
  );

  const _swipeHold = _debounce(({ direction, offsetDirection }) => {
    // return if the game is paused by dialogs or in settings mode
    if(isGamePaused()) return;
    // if we get a bad pan, use the best guess
    if(direction === 1) direction = offsetDirection;

    intervalId = setInterval(() => {
      switch(direction) {
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
          // console.log(`Unmapped pan direction ${direction}`);
      }
    }, ANIMATION_WITH_PADDING);
  },
    ANIMATION_WITH_PADDING,
    { maxWait: ANIMATION_WITH_PADDING, leading: true, trailing: false }
  );

  const _tap = _debounce(() => {
    // if the game is not paused by dialogs
    if(!isGamePaused()) attackMonster();
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
    // move with 'WASD' or Arrow keys
    switch(event.keyCode) {
      case 37:
      case 65:
        return movePlayer('WEST');
      case 38:
      case 87:
        return movePlayer('NORTH');
      case 39:
      case 68:
        return movePlayer('EAST');
      case 40:
      case 83:
        return movePlayer('SOUTH');
      case 13:
      case 32:
        // attack with enter or space key
        return attackMonster();
      default:
        // console.log('key not mapped: ', event.keyCode);
    }
  }

  return null;
};

const actions = { attackMonster, movePlayer, isGamePaused };

export default connect(null, actions)(Controls);