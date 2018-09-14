import _debounce from 'lodash.debounce';

import attackMonster from './attack-monster';
import store         from '../../config/store';
import {
  SPRITE_SIZE,
  MAP_WIDTH,
  MAP_HEIGHT
} from '../../config/constants';

const DEBOUNCE_TIME = 80; // 80 ms

export default function handleMovement(player) {

  function attemptMove(direction) {
    const oldPos = store.getState().player.position;
    const newPos = getNewPosition(oldPos, direction);

    if(observeBoundaries(oldPos, newPos) && observeImpassable(oldPos, newPos)
        && checkForMonster(newPos)) {
      dispatchMove(direction, newPos);
    }
  }

  function checkForMonster(newPos) {
    let validMove = true;
    const monsters = store.getState().monsters.components;
    // check for monsters
    Object.keys(monsters).forEach(monsterId => {
      let currMonster = monsters[monsterId].props.monster;
      let monsterPos = currMonster.position;
      // if the new position contains a monster
      if(JSON.stringify(monsterPos) === JSON.stringify([newPos[0], newPos[1]])) {
        attackMonster(monsterPos, currMonster);
        // monsters found, don't allow for movement
        validMove = false;
      }
    });
    // no monsters found in newPos
    return validMove;
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
      // get a random amount of gold between 3 and 10
      store.dispatch({
        type: 'GET_GOLD',
        payload: { value: Math.floor(Math.random() * 8) + 3 }
      })
      store.dispatch({
        type: 'GET_EXP',
        payload: { value: 10 }
      })
      store.dispatch({
        type: 'OPEN_CHEST',
        payload: { x, y }
      })
    }

    // the player wants to use the stairs
    if(nextTile === 8 || nextTile === 9) {
      let direction;
      // player wants to go down
      if(nextTile === 8) {
        direction = 'down';
      }
      // player wants to go up
      if(nextTile === 9) {
        direction = 'up';
      }
      // change the world map
      store.dispatch({
        type: 'LOAD_NEXT_MAP',
        payload: { direction }
      })
      // move the player to where the 'stairs' were
      return true;
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
    // eslint-disable-next-line
    handleKeyDown = _debounce(handleKeyDown,
      DEBOUNCE_TIME,
      {
        leading: true,
        trailing: false,
      }
    );
    // if the game is not paused by dialogs
    if(!(store.getState().world.paused)) handleKeyDown(event);
  });

  return player;
}
