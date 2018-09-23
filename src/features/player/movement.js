import React     from 'react';
import _debounce from 'lodash.debounce';

import GameWin       from '../../components/game-win';
import ShopDialog    from '../../components/shop-dialog';
import attackMonster from './attack-monster';
import exploreTiles  from './explore-tiles';
import openChest     from './open-chest';
import store         from '../../config/store';
import {
  SPRITE_SIZE,
  MAP_WIDTH,
  MAP_HEIGHT,
  ANIMATION_SPEED
} from '../../config/constants';

export function checkForMonster(newPos, direction) {
  let { currentMap } = store.getState().world;
  let validMove = false;
  const monsters = store.getState().monsters.components;
  // check for monsters
  Object.keys(monsters[currentMap]).forEach(monsterId => {
    let currMonster = monsters[currentMap][monsterId].props.monster;
    let monsterPos = currMonster.position;
    // if the new position contains a monster
    if(JSON.stringify(monsterPos) === JSON.stringify([newPos[0], newPos[1]])) {
      validMove = currMonster.id;
    }
  });
  // no monsters found in newPos
  return validMove;
}

export function getNewPosition(oldPos, direction) {
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
  }
}

export function observeBoundaries(oldPos, newPos) {
  return (newPos[0] >= 0 && newPos[0] <= MAP_WIDTH - SPRITE_SIZE) &&
         (newPos[1] >= 0 && newPos[1] <= MAP_HEIGHT - SPRITE_SIZE)
}

export default function handleMovement(player) {

  function attemptMove(direction) {
    const oldPos = store.getState().player.position;
    const newPos = getNewPosition(oldPos, direction);

    if(observeBoundaries(oldPos, newPos) && observeImpassable(oldPos, newPos)
        && !checkForMonster(newPos, direction)) {
      // move the player
      dispatchMove(direction, newPos);
      // explore new tiles
      exploreTiles(newPos);
      // take a turn
      takeTurn();
    } else {
      // dont move the player
      const { playerMoved, position } = store.getState().player;
      // turn the player but do not play the
      // walk animation triggered by a change in playerMoved
      store.dispatch({
        type: 'MOVE_PLAYER',
        payload: { direction, playerMoved, position }
      });
    }
  }

  function takeTurn() {
    store.dispatch({
      type: 'TAKE_TURN',
      payload: {}
    });
  }

  function dispatchMove(direction, newPos) {
    store.dispatch({
      type: 'MOVE_PLAYER',
      payload: {
        position: newPos,
        direction
      }
    });
  }

  function observeImpassable(oldPos, newPos) {
    const tiles = store.getState().map.tiles;
    const y = newPos[1] / SPRITE_SIZE;
    const x = newPos[0] / SPRITE_SIZE;

    const nextTile = tiles[y][x].value;

    // the player wants to use the stairs
    if(nextTile === 2 || nextTile === 3) {
      let direction;
      // player wants to go down
      if(nextTile === 2) {
        direction = 'down';
      }
      // player wants to go up
      if(nextTile === 3) {
        direction = 'up';
      }
      // change the world map
      store.dispatch({
        type: 'LOAD_NEXT_MAP',
        payload: { direction }
      })
    }

    if(nextTile === 4) {
      // open the chest
      openChest(x, y);
    }

    // the player wants to use the shop
    if(nextTile === 9) {
      // show the shop dialog
      store.dispatch({
        type: 'PAUSE',
        payload: { component: <ShopDialog /> }
      })
    }

    // the player has accessed a shrine
    if(nextTile === 10) {
      // check if they have won the game
      store.dispatch({
        type: 'PAUSE',
        payload: { component: <GameWin /> }
      })
    }

    return nextTile < 5;
  }

  function handleKeyDown(event) {
    event.preventDefault();

    // move with 'WASD' or Arrow keys
    switch(event.keyCode) {
      case 37:
      case 65:
        return attemptMove('WEST');
      case 38:
      case 87:
        return attemptMove('NORTH');
      case 39:
      case 68:
        return attemptMove('EAST');
      case 40:
      case 83:
        return attemptMove('SOUTH');
      case 13:
        // attack with enter key
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

  return player;
}
