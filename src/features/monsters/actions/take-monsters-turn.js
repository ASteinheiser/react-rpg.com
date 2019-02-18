import { SPRITE_SIZE } from '../../../config/constants';
import calculateDamage from '../../../utils/calculate-damage';
import getNextTile     from '../../../utils/get-next-tile';
import { radiusTiles } from '../../../utils/get-surrounding-tiles';

const MONSTER_ATTACK_RADIUS = 1;

export default function takeMonstersTurn() {
  return (dispatch, getState) => {

    const { monsters, map, world } = getState();
    // get the current monsters
    const { components } = monsters;
    const { sightBox } = map;
    const { currentMap } = world;
    // find each monster
    Object.keys(components[currentMap]).forEach(monsterId => {
      // get monster id and position
      const { id, position, damage } = components[currentMap][monsterId];
      // find the relative position
      let monsterPos = position.map(value => value / SPRITE_SIZE);

      let monsterVisible = false;
      // look through each current sight box tile
      sightBox.forEach(tile => {
        // if the monster is in sight
        if(JSON.stringify(tile) === JSON.stringify(monsterPos)) {
          monsterVisible = true;
        }
      });

      if(monsterVisible) {
        dispatch({
          type: 'REVEAL_MONSTER',
          payload: { id, map: currentMap }
        });

        const { player, stats } = getState();
        // check if player is in range
        if(playerInRange(player.position, monsterPos)) {
          // calculate damage
          let calculatedMonsterDamage = calculateDamage(damage, stats.defence);
          // deal damage to player
          dispatch({
            type: 'DAMAGE_TO_PLAYER',
            payload: calculatedMonsterDamage
          });
          // show the attack animation and play sound
          dispatch({
            type: 'MONSTER_ATTACK',
            payload: null
          });
          // check if player died
          if((stats.hp - calculatedMonsterDamage) <= 0) {
            // play death sound
            dispatch({
              type: 'PLAYER_DIED',
              payload: null
            });
            // if it did, game over
            dispatch({
              type: 'PAUSE',
              payload: {
                gameOver: true,
                pause: true
              }
            });
          }
        } else {
          // no player in range, time to move!
          // get the monsters actual position in pixels
          let position = monsterPos.map(value => value * SPRITE_SIZE);
          // get distance from player on both axis
          let xDiff = position[0] - player.position[0];
          let yDiff = position[1] - player.position[1];
          let greaterY = Math.abs(yDiff) > Math.abs(xDiff);
          // see if y axis is greater distance from player
          if(greaterY) {
            // if the monster is mostly below the player on the y axis
            if(yDiff > 0) {
              // move the monster 'up' relatively
              moveMonster('up', position, currentMap, id, 0, xDiff >= 0 ? 'left' : 'right');
            }
            // if the monster is mostly above the player on the y axis
            else if(yDiff < 0) {
              // move the monster 'down' relatively
              moveMonster('down', position, currentMap, id, 0, xDiff >= 0 ? 'left' : 'right');
            }
          } else { // x axis is greater distance from player
            // if the monster is mostly to the right of the player
            if(xDiff > 0) {
              // move the monster 'left' relatively
              moveMonster('left', position, currentMap, id, 0, yDiff >= 0 ? 'up' : 'down');
            }
            // if the monster is mostly to the left of the player
            else if(xDiff < 0) {
              // move the monster 'right' relatively
              moveMonster('right', position, currentMap, id, 0, yDiff >= 0 ? 'up' : 'down');
            }
          }
        }
      } else {
        // monster is too far away from the player
        dispatch({
          type: 'HIDE_MONSTER',
          payload: { id, map: currentMap }
        });
        // give a 25% chance to move the monster when hidden
        if((Math.round(Math.random() * (4 - 1) + 1)) !== 4) {
          let randomDirection = getRandomDirection();
          // move the monster in a random direction
          moveMonster(randomDirection, position, currentMap, id, 0);
        }
      }
    });

    function checkForOtherMonster(id, position, currentMap) {
      // get current monsters
      let monsterList = getState().monsters.components[currentMap];
      let foundMonster = false;
      // check list of monsters
      Object.keys(monsterList).forEach(monsterId => {
        // see if there's another monster in the next position
        if(JSON.stringify(monsterList[monsterId].position) === JSON.stringify(position)) {
          if(monsterId !== id) {
            foundMonster = true;
          }
        }
      })

      return foundMonster;
    }

    function observeImpassable(newPos) {
      const nextTile = getNextTile(getState().world, newPos);

      return nextTile < 5 ? newPos : false;
    }

    // recursive function for moving the monster to the next available tile
    // will try to go towards the player if possible
    function moveMonster(direction, position, currentMap, id, count, preference = false) {
      count ++;
      // dont allow for infinite loops when monster can't move
      if(count >= 5) return;

      let nextPos = [0,0];

      switch(direction) {
        case 'up':
          nextPos = [position[0], position[1] - SPRITE_SIZE];
          // see if the monster can move to the next location
          if(observeImpassable(nextPos)) {
            // if we found a monster
            if(checkForOtherMonster(id, nextPos, currentMap)) {
              // move in a circle, but the opposite direction
              return moveMonster(preference ? preference : 'left', position, currentMap, id, count);
            } else {
              // otherwise just move to the next spot
              position[1] -= SPRITE_SIZE;
            }
            break;
          } else {
            // otherwise move them to another spot
            return moveMonster(preference ? preference : 'right', position, currentMap, id, count);
          }
        case 'down':
          nextPos = [position[0], position[1] + SPRITE_SIZE];
          // see if the monster can move to the next location
          if(observeImpassable(nextPos)) {
            // if we found a monster
            if(checkForOtherMonster(id, nextPos, currentMap)) {
              // move in a circle, but the opposite direction
              return moveMonster(preference ? preference : 'right', position, currentMap, id, count);
            } else {
              // otherwise just move to the next spot
              position[1] += SPRITE_SIZE;
            }
            break;
          } else {
            // otherwise move them to another spot
            return moveMonster(preference ? preference : 'left', position, currentMap, id, count);
          }
        case 'left':
          nextPos = [position[0] - SPRITE_SIZE, position[1]];
          // see if the monster can move to the next location
          if(observeImpassable(nextPos)) {
            // if we found a monster
            if(checkForOtherMonster(id, nextPos, currentMap)) {
              // move in a circle, but the opposite direction
              return moveMonster(preference ? preference : 'down', position, currentMap, id, count);
            } else {
              // otherwise just move to the next spot
              position[0] -= SPRITE_SIZE;
            }
            break;
          } else {
            // otherwise move them to another spot
            return moveMonster(preference ? preference : 'up', position, currentMap, id, count);
          }
        case 'right':
          nextPos = [position[0] + SPRITE_SIZE, position[1]];
          // see if the monster can move to the next location
          if(observeImpassable(nextPos)) {
            // if we found a monster
            if(checkForOtherMonster(id, nextPos, currentMap)) {
              // move in a circle, but the opposite direction
              return moveMonster(preference ? preference : 'up', position, currentMap, id, count);
            } else {
              // otherwise just move to the next spot
              position[0] += SPRITE_SIZE;
            }
            break;
          } else {
            // otherwise move them to another spot
            return moveMonster(preference ? preference : 'down', position, currentMap, id, count);
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
      } else {
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
    }
  }
}

function playerInRange(playerPos, monsterPos) {
  let inRange = false;
  // for each tile around the monster
  radiusTiles(MONSTER_ATTACK_RADIUS).forEach(tile => {
    // add the monsters location
    let offsetX = tile.x + monsterPos[0];
    let offsetY = tile.y + monsterPos[1];
    // see if the player is in range
    const playerLocation = playerPos.map(value => value / SPRITE_SIZE);
    if(JSON.stringify([offsetX, offsetY]) === JSON.stringify(playerLocation)) {
      inRange = true;
    }
  });
  return inRange;
}

function getRandomDirection() {
  let directions = ['up', 'down', 'left', 'right'];
  let randomNumber = Math.floor(Math.random() * directions.length);
  return directions[randomNumber];
}
