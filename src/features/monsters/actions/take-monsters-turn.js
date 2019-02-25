import attackPlayer    from './attack-player';
import moveMonster     from './move-monster';
import { SPRITE_SIZE } from '../../../config/constants';
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
      const monsterPos = position.map(value => value / SPRITE_SIZE);

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

        const { player } = getState();
        // check if player is in range
        if(playerInRange(player.position, monsterPos)) {
          dispatch(attackPlayer(damage));
        }
        else {
          // no player in range, time to move!
          // get the monsters actual position in pixels
          const position = monsterPos.map(value => value * SPRITE_SIZE);
          // get distance from player on both axis
          const xDiff = position[0] - player.position[0];
          const yDiff = position[1] - player.position[1];
          const greaterY = Math.abs(yDiff) > Math.abs(xDiff);
          // see if y axis is greater distance from player
          if(greaterY) {
            // if the monster is mostly below the player on the y axis
            if(yDiff > 0) {
              // move the monster 'up' relatively
              dispatch(moveMonster('up', position, currentMap, id, 0, xDiff >= 0 ? 'left' : 'right'));
            }
            // if the monster is mostly above the player on the y axis
            else if(yDiff < 0) {
              // move the monster 'down' relatively
              dispatch(moveMonster('down', position, currentMap, id, 0, xDiff >= 0 ? 'left' : 'right'));
            }
          } // x axis is greater distance from player
          else {
            // if the monster is mostly to the right of the player
            if(xDiff > 0) {
              // move the monster 'left' relatively
              dispatch(moveMonster('left', position, currentMap, id, 0, yDiff >= 0 ? 'up' : 'down'));
            }
            // if the monster is mostly to the left of the player
            else if(xDiff < 0) {
              // move the monster 'right' relatively
              dispatch(moveMonster('right', position, currentMap, id, 0, yDiff >= 0 ? 'up' : 'down'));
            }
          }
        }
      } // monster is too far away from the player
      else {
        dispatch({
          type: 'HIDE_MONSTER',
          payload: { id, map: currentMap }
        });
        // give a 25% chance to move the monster when hidden
        if((Math.round(Math.random() * (4 - 1) + 1)) !== 4) {
          const randomDirection = getRandomDirection();
          // move the monster in a random direction
          dispatch(moveMonster(randomDirection, position, currentMap, id, 0));
        }
      }
    });
  };
}

function playerInRange(playerPos, monsterPos) {
  let inRange = false;
  // for each tile around the monster
  radiusTiles(MONSTER_ATTACK_RADIUS).forEach(tile => {
    // add the monsters location
    const offsetX = tile.x + monsterPos[0];
    const offsetY = tile.y + monsterPos[1];
    // see if the player is in range
    const playerLocation = playerPos.map(value => value / SPRITE_SIZE);
    if(JSON.stringify([offsetX, offsetY]) === JSON.stringify(playerLocation)) {
      inRange = true;
    }
  });
  return inRange;
}

function getRandomDirection() {
  const directions = ['up', 'down', 'left', 'right'];
  const randomNumber = Math.floor(Math.random() * directions.length);
  return directions[randomNumber];
}
