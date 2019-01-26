import Hammer    from 'react-hammerjs';
import _debounce from 'lodash.debounce';

import movePlayer          from './movement';
import attackMonster       from './attack-monster';
import store               from '../../config/store';
import { ANIMATION_SPEED } from '../../config/constants';

export default function Controls(player) {
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

  window.addEventListener('keydown', _debounce((event) => {
    // if the game is not paused by dialogs
    if(!(store.getState().world.paused)) handleKeyDown(event);
  },
    ANIMATION_SPEED,
    { maxWait: ANIMATION_SPEED, leading: true, trailing: false })
  );

  // var touchEnabledPlayer = new Hammer.Manager(player);

  // touchEnabledPlayer.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
  // touchEnabledPlayer.add( new Hammer.Tap({ event: 'quadrupletap', taps: 4 }) );

  // touchEnabledPlayer.on('swipe', handlePan);
  // touchEnabledPlayer.on('quadrupletap', handleTaps);

  return player;
}