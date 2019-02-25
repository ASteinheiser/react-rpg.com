import getNextTile     from '../../../utils/get-next-tile';
import { SPRITE_SIZE } from '../../../config/constants';

// recursive function for moving the monster to the next available tile
// will try to go towards the player if possible
export default function moveMonster(direction, position, currentMap, id, count, preference = false) {
  return (dispatch, getState) => {

    count ++;
    // dont allow for infinite loops when monster can't move
    if(count >= 5) return;

    let nextPos = [0, 0];

    switch(direction) {
      case 'up':
        nextPos = [position[0], position[1] - SPRITE_SIZE];
        // see if the monster can move to the next location
        if(observeImpassable(nextPos)) {
          // if we found a monster
          if(checkForOtherMonster(id, nextPos, currentMap)) {
            // move in a circle, but the opposite direction
            return dispatch(moveMonster(preference ? preference : 'left', position, currentMap, id, count));
          }
          else {
            // otherwise just move to the next spot
            position[1] -= SPRITE_SIZE;
          }
          break;
        }
        else {
          // otherwise move them to another spot
          return dispatch(moveMonster(preference ? preference : 'right', position, currentMap, id, count));
        }
      case 'down':
        nextPos = [position[0], position[1] + SPRITE_SIZE];
        // see if the monster can move to the next location
        if(observeImpassable(nextPos)) {
          // if we found a monster
          if(checkForOtherMonster(id, nextPos, currentMap)) {
            // move in a circle, but the opposite direction
            return dispatch(moveMonster(preference ? preference : 'right', position, currentMap, id, count));
          }
          else {
            // otherwise just move to the next spot
            position[1] += SPRITE_SIZE;
          }
          break;
        }
        else {
          // otherwise move them to another spot
          return dispatch(moveMonster(preference ? preference : 'left', position, currentMap, id, count));
        }
      case 'left':
        nextPos = [position[0] - SPRITE_SIZE, position[1]];
        // see if the monster can move to the next location
        if(observeImpassable(nextPos)) {
          // if we found a monster
          if(checkForOtherMonster(id, nextPos, currentMap)) {
            // move in a circle, but the opposite direction
            return dispatch(moveMonster(preference ? preference : 'down', position, currentMap, id, count));
          }
          else {
            // otherwise just move to the next spot
            position[0] -= SPRITE_SIZE;
          }
          break;
        }
        else {
          // otherwise move them to another spot
          return dispatch(moveMonster(preference ? preference : 'up', position, currentMap, id, count));
        }
      case 'right':
        nextPos = [position[0] + SPRITE_SIZE, position[1]];
        // see if the monster can move to the next location
        if(observeImpassable(nextPos)) {
          // if we found a monster
          if(checkForOtherMonster(id, nextPos, currentMap)) {
            // move in a circle, but the opposite direction
            return dispatch(moveMonster(preference ? preference : 'up', position, currentMap, id, count));
          }
          else {
            // otherwise just move to the next spot
            position[0] += SPRITE_SIZE;
          }
          break;
        }
        else {
          // otherwise move them to another spot
          return dispatch(moveMonster(preference ? preference : 'down', position, currentMap, id, count));
        }
      default:
    }
    // recalculate if the monster is in sight
    const { sightBox } = getState().map;
    let inSight = false;
    // look through each current sight box tile
    sightBox.forEach(tile => {
      // if the monster is in sight
      const newMonsterPos = position.map(value => value / SPRITE_SIZE);
      if(JSON.stringify(tile) === JSON.stringify(newMonsterPos)) {
        inSight = true;
      }
    });
    // if the monster is now in sight
    if(inSight) {
      dispatch({
        type: 'REVEAL_MONSTER',
        payload: { id, map: currentMap }
      });
    }
    else {
      // if the monster is now out of sight
      dispatch({
        type: 'HIDE_MONSTER',
        payload: { id, map: currentMap }
      });
    }
    // move the monster
    dispatch({
      type: 'MOVE_MONSTER',
      payload: {
        map: currentMap,
        id,
        position
      }
    });

    function checkForOtherMonster(id, position, currentMap) {
      // get current monsters
      const monsterList = getState().monsters.components[currentMap];
      let foundMonster = false;
      // check list of monsters
      Object.keys(monsterList).forEach(monsterId => {
        // see if there's another monster in the next position
        if(JSON.stringify(monsterList[monsterId].position) === JSON.stringify(position)) {
          if(monsterId !== id) {
            foundMonster = true;
          }
        }
      });

      return foundMonster;
    }

    function observeImpassable(newPos) {
      const nextTile = getNextTile(getState().world, newPos);

      return nextTile < 5 ? newPos : false;
    }
  };
}
