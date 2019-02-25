import exploreTiles from './explore-tiles';
import exploreChest from './explore-chest';
import walkStairs   from './walk-stairs';
import getNextTile  from '../../../utils/get-next-tile';
import { SPRITE_SIZE, MAP_WIDTH, MAP_HEIGHT } from '../../../config/constants';

export default function movePlayer(direction) {
  return (dispatch, getState) => {

    const oldPos = getState().player.position;
    const newPos = getNewPosition(oldPos, direction);

    const nextTile = observeImpassable(newPos);

    if(observeBoundaries(newPos) && nextTile < 5
        && !dispatch(checkForMonster(newPos, direction))) {
      // explore new tiles
      dispatch(exploreTiles(newPos));
      // move the player
      dispatch({
        type: 'MOVE_PLAYER',
        payload: {
          position: newPos,
          direction
        }
      });
      // if we do anything but use stairs, count a turn
      if(handleInteractWithTile(nextTile, newPos)) {
        dispatch({
          type: 'TAKE_TURN',
          payload: null
        });
      }
    } // dont move the player
    else {
      const { playerMoved, position } = getState().player;
      // turn the player but do not play the
      // walk animation triggered by a change in playerMoved
      dispatch({
        type: 'MOVE_PLAYER',
        payload: { direction, playerMoved, position }
      });
    }

    function handleInteractWithTile(nextTile, newPos) {
      // the player wants to use the stairs
      if(nextTile === 2 || nextTile === 3) {
        dispatch({
          type: 'MAP_TRANSITION',
          payload: null
        });
        dispatch(walkStairs(nextTile, newPos));
        return false;
      }
      // player wants to open chest
      if(nextTile === 4) {
        const y = newPos[1] / SPRITE_SIZE;
        const x = newPos[0] / SPRITE_SIZE;
        // open the chest
        dispatch(exploreChest(x, y));
      }
      return true;
    }

    function observeImpassable(newPos) {
      const nextTile = getNextTile(getState().world, newPos);

      // the player wants to use the shop
      if(nextTile === 9) {
        // show the shop dialog
        dispatch({
          type: 'PAUSE',
          payload: {
            pause: true,
            shop: true
          }
        });
      }

      // the player has accessed a shrine
      if(nextTile === 10) {
        // check if they have won the game
        dispatch({
          type: 'PAUSE',
          payload: {
            pause: true,
            gameWin: true
          }
        });
      }

      return nextTile;
    }
  };
}

// returns `false` or the monster's id
export function checkForMonster(newPos) {
  return (_, getState) => {

    let isMonster = false;
    const { currentMap } = getState().world;
    const monsters = getState().monsters.components;
    // check for monsters
    Object.keys(monsters[currentMap]).forEach(monsterId => {
      const currMonster = monsters[currentMap][monsterId];
      // if the new position contains a monster
      if(JSON.stringify(currMonster.position) === JSON.stringify(newPos)) {
        isMonster = currMonster.id;
      }
    });

    return isMonster;
  };
}

export function getNewPosition(oldPos, direction) {
  switch(direction) {
    case 'WEST':
      return [oldPos[0] - SPRITE_SIZE, oldPos[1]];
    case 'EAST':
      return [oldPos[0] + SPRITE_SIZE, oldPos[1]];
    case 'NORTH':
      return [oldPos[0], oldPos[1] - SPRITE_SIZE];
    case 'SOUTH':
      return [oldPos[0], oldPos[1] + SPRITE_SIZE];
    default:
  }
}

export function observeBoundaries(newPos) {
  return (newPos[0] >= 0 && newPos[0] <= MAP_WIDTH - SPRITE_SIZE) &&
         (newPos[1] >= 0 && newPos[1] <= MAP_HEIGHT - SPRITE_SIZE);
}