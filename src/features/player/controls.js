import Hammer    from 'hammerjs';
import _debounce from 'lodash.debounce';

import movePlayer          from './actions/movement';
import attackMonster       from './actions/attack-monster';
import store               from '../../config/store';
import { ANIMATION_SPEED } from '../../config/constants';

var intervalId = null;

export default function Controls(player) {

  function gamePaused() {
    const { paused, settings } = store.getState().dialog;
    if(paused || settings) return true;
    return false;
  }

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

  // enable keyboard for player controls
  window.addEventListener('keydown', _debounce((event) => {
    // if the game is not paused by dialogs
    if(!gamePaused()) handleKeyDown(event);
  },
    ANIMATION_SPEED,
    { maxWait: ANIMATION_SPEED, leading: true, trailing: false })
  );

  // enable touch for player controls
  let hammertime = new Hammer(document.getElementById('window'));

  hammertime.get('pan').set({ direction: Hammer.DIRECTION_ALL });
  hammertime.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
  hammertime.get('tap').set({ taps: 2 });

  hammertime.on('swipe', _debounce(({ direction, offsetDirection }) => {
    // return if the game is paused by dialogs
    if(gamePaused()) return;
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
    ANIMATION_SPEED,
    { maxWait: ANIMATION_SPEED, leading: true, trailing: false }
  ));

  hammertime.on('panend', _ => {
    clearInterval(intervalId);
  });

  hammertime.on('panstart', _debounce(({ direction, offsetDirection }) => {
    // return if the game is paused by dialogs or in settings mode
    if(gamePaused()) return;
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
    }, ANIMATION_SPEED * 1.25);
  },
    ANIMATION_SPEED,
    { maxWait: ANIMATION_SPEED, leading: true, trailing: false }
  ));

  hammertime.on('tap', _debounce(() => {
    // if the game is not paused by dialogs
    if(!gamePaused()) attackMonster();
  },
    ANIMATION_SPEED,
    { maxWait: ANIMATION_SPEED, leading: true, trailing: false })
  );

  return player;
}