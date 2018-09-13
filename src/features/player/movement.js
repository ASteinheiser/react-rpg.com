import _debounce from 'lodash.debounce';

import store from '../../config/store';
import {
  SPRITE_SIZE,
  MAP_WIDTH,
  MAP_HEIGHT
} from '../../config/constants';

const DEBOUNCE_TIME = 100; // .1 seconds

export default function handleMovement(player) {

  function attemptMove(direction) {
    const oldPos = store.getState().player.position;
    const newPos = getNewPosition(oldPos, direction);

    if(observeBoundaries(oldPos, newPos) && observeImpassable(oldPos, newPos)) {
      dispatchMove(direction, newPos);
    }
  }

  function getSpriteLocation(direction, walkIndex) {
    switch(direction) {
      case 'SOUTH':
        return `${SPRITE_SIZE*walkIndex}px ${SPRITE_SIZE*0}px`
      case 'EAST':
        return `${SPRITE_SIZE*walkIndex}px ${SPRITE_SIZE*1}px`
      case 'WEST':
        return `${SPRITE_SIZE*walkIndex}px ${SPRITE_SIZE*2}px`
      case 'NORTH':
        return `${SPRITE_SIZE*walkIndex}px ${SPRITE_SIZE*3}px`
      default:
        // not good if you get here...
    }
  }

  function getNewPosition(oldPos, direction) {
    switch(direction) {
      case 'WEST':
        return [ oldPos[0] - SPRITE_SIZE, oldPos[1] ]
      case 'EAST':
        return [ oldPos[0] + SPRITE_SIZE, oldPos[1] ]
      case 'NORTH':
        return [ oldPos[0], oldPos[1] - SPRITE_SIZE ]
      case 'SOUTH':
        return [ oldPos[0], oldPos[1] + SPRITE_SIZE ]
      default:
        // not good if you get here...
    }
  }

  function getWalkIndex() {
    const walkIndex = store.getState().player.walkIndex;

    return walkIndex >= 7 ? 0 : walkIndex + 1;
  }

  function dispatchMove(direction, newPos) {
    let walkIndex = getWalkIndex();

    store.dispatch({
      type: 'MOVE_PLAYER',
      payload: {
        position: newPos,
        direction,
        walkIndex,
        spriteLocation: getSpriteLocation(direction, walkIndex)
      }
    });
  }

  function observeBoundaries(oldPos, newPos) {
    return (newPos[0] >= 0 && newPos[0] <= MAP_WIDTH - SPRITE_SIZE) &&
           (newPos[1] >= 0 && newPos[1] <= MAP_HEIGHT - SPRITE_SIZE)
  }

  function observeImpassable(oldPos, newPos) {
    const tiles = store.getState().map.tiles;
    const y = newPos[1] / SPRITE_SIZE;
    const x = newPos[0] / SPRITE_SIZE;

    const nextTile = tiles[y][x];

    if(nextTile === 4) {
      // TODO: give the player loot!
      store.dispatch({
        type: 'GET_EXP',
        payload: { value: 10 }
      })
      store.dispatch({
        type: 'REMOVE_CHEST',
        payload: { x, y }
      })
    }

    if(nextTile === 7) {
      // calculate which border player was at
      let border;
      if(y === 0) border = 'NORTH';
      if(y === (MAP_HEIGHT / SPRITE_SIZE) - 1) border = 'SOUTH';
      if(x === 0) border = 'WEST';
      if(x === (MAP_WIDTH / SPRITE_SIZE) - 1) border = 'EAST';

      store.dispatch({
        type: 'MOVE_OPPOSITE',
        payload: { border }
      })

      // change the world map
      store.dispatch({
        type: 'LOAD_NEXT_MAP',
        payload: {}
      })
    }

    return nextTile < 5;
  }

  function handleKeyDown(event) {
    event.preventDefault();

    switch(event.keyCode) {
      case 37:
        return attemptMove('WEST');
      case 38:
        return attemptMove('NORTH');
      case 39:
        return attemptMove('EAST');
      case 40:
        return attemptMove('SOUTH');
      default:
        // console.log('key not mapped: ', event.keyCode);
    }
  }

  window.addEventListener('keydown', (event) => {
    handleKeyDown = _debounce(handleKeyDown,
      DEBOUNCE_TIME,
      {
        leading: true,
        trailing: false,
      }
    );

    handleKeyDown(event);
  });

  return player;
}
