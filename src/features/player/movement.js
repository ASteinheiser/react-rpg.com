import store from '../../config/store';
import {
  SPRITE_SIZE,
  MAP_WIDTH,
  MAP_HEIGHT
} from '../../config/constants';

export default function handleMovement(player) {

  function getNewPosition(direction) {
    const oldPos = store.getState().player.position;

    switch(direction) {
      case 'WEST':
        return [ oldPos[0] - SPRITE_SIZE, oldPos[1] ];
      case 'EAST':
        return [ oldPos[0] + SPRITE_SIZE, oldPos[1] ];
      case 'NORTH':
        return [ oldPos[0], oldPos[1] - SPRITE_SIZE ];
      case 'SOUTH':
        return [ oldPos[0], oldPos[1] + SPRITE_SIZE ];
    }
  }

  function directionMove(direction) {
    const oldPos = store.getState().player.position;

    store.dispatch({
      type: 'MOVE_PLAYER',
      payload: {
        position: observeBoundaries(oldPos, getNewPosition(direction))
      }
    });
  }

  function observeBoundaries(oldPos, newPos) {
    return (newPos[0] >= 0 && newPos[0] <= MAP_WIDTH - SPRITE_SIZE) &&
           (newPos[1] >= 0 && newPos[1] <= MAP_HEIGHT - SPRITE_SIZE)
           ? newPos : oldPos
  }

  function handleKeyDown(event) {
    event.preventDefault();

    switch(event.keyCode) {
      case 37:
        return directionMove('WEST');
      case 38:
        return directionMove('NORTH');
      case 39:
        return directionMove('EAST');
      case 40:
        return directionMove('SOUTH');
      default:
        // console.log('key not mapped: ', event.keyCode);
    }
  }

  window.addEventListener('keydown', (event) => {
    handleKeyDown(event);
  });

  return player;
}
