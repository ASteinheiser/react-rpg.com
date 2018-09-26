import { SPRITE_SIZE } from '../../config/constants';
import store           from '../../config/store';
import calculateDamage from '../../modules/calculate-damage';

let x, y;
const radiusTiles = [];
const RADIUS = 1;
// calculate a tile map with desired radius
for (y = -RADIUS; y <= RADIUS; y++) {
  for (x = -RADIUS; x <= RADIUS; x++) {
    if ((x * x) + (y * y) <= (RADIUS * RADIUS)) {
      radiusTiles.push({x, y});
    }
  }
}

function playerInRange(playerPos, monsterPos) {
  let inRange = false;
  // for each tile around the monster
  radiusTiles.forEach(tile => {
    // add the monsters location
    let offsetX = tile.x + monsterPos[0];
    let offsetY = tile.y + monsterPos[1];
    // see if the player is in range
    if(JSON.stringify([offsetX, offsetY]) === JSON.stringify([playerPos[1] / SPRITE_SIZE, playerPos[0] / SPRITE_SIZE])) {
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

function observeImpassable(newPos) {
  const tiles = store.getState().map.tiles;
  const y = newPos[1] / SPRITE_SIZE;
  const x = newPos[0] / SPRITE_SIZE;

  const nextTile = tiles[y][x].value;

  return nextTile < 5 ? newPos : false;
}

// recursive function for moving the monster to the next available tile
// will try to go towards the player if possible
function moveMonster(direction, position, currentMap, id) {
  switch(direction) {
    case 'up':
      // see if the monster can move to the next location
      if(observeImpassable([position[0], position[1] - SPRITE_SIZE])) {
        position[1] -= SPRITE_SIZE;
      } else {
        // otherwise move them to another spot
        return moveMonster('right', position, currentMap, id)
      }
      break;
    case 'down':
      // see if the monster can move to the next location
      if(observeImpassable([position[0], position[1] + SPRITE_SIZE])) {
        position[1] += SPRITE_SIZE;
      } else {
        // otherwise move them to another spot
        return moveMonster('left', position, currentMap, id)
      }
      break;
    case 'left':
      // see if the monster can move to the next location
      if(observeImpassable([position[0] - SPRITE_SIZE, position[1]])) {
        position[0] -= SPRITE_SIZE;
      } else {
        // otherwise move them to another spot
        return moveMonster('up', position, currentMap, id)
      }
      break;
    case 'right':
      // see if the monster can move to the next location
      if(observeImpassable([position[0] + SPRITE_SIZE, position[1]])) {
        position[0] += SPRITE_SIZE;
      } else {
        // otherwise move them to another spot
        return moveMonster('down', position, currentMap, id)
      }
      break;
    default:
  }
  const { sightBox } = store.getState().map;
  // look through each current sight box tile
  sightBox.forEach(tile => {
    // if the monster is in sight
    if(JSON.stringify(tile) === JSON.stringify(position)) {
      store.dispatch({
        type: 'REVEAL_MONSTER',
        payload: { id, map: currentMap }
      })
    }
  });
  // move the monster
  store.dispatch({
    type: 'MOVE_MONSTER',
    payload: {
      map: currentMap,
      id,
      position
    }
  })
}

export default function takeMonstersTurn() {
  // get the current monsters
  const { components } = store.getState().monsters;
  const { sightBox } = store.getState().map;
  const { currentMap } = store.getState().world;
  // find each monster
  Object.keys(components[currentMap]).forEach(monsterId => {
    // get monster id and position
    const { id, position, damage } = components[currentMap][monsterId].props.monster;
    // find the relative position
    let monsterPos = [(position[1] / SPRITE_SIZE), (position[0] / SPRITE_SIZE)];

    let monsterVisible = false;
    // look through each current sight box tile
    sightBox.forEach(tile => {
      // if the monster is in sight
      if(JSON.stringify(tile) === JSON.stringify(monsterPos)) {
        monsterVisible = true;
      }
    });

    if(monsterVisible) {
      store.dispatch({
        type: 'REVEAL_MONSTER',
        payload: { id, map: currentMap }
      })
      const { player, stats } = store.getState();

      // check if player is in range
      if(playerInRange(player.position, monsterPos)) {
        // calculate damage
        let calculatedMonsterDamage = calculateDamage(damage, stats.defence);
        // deal damage to player
        store.dispatch({
          type: 'DAMAGE_TO_PLAYER',
          payload: {
            damage: calculatedMonsterDamage
          }
        })
        // show the attack animation and play sound
        store.dispatch({
          type: 'MONSTER_ATTACK',
          payload: {}
        })
        // check if player died
        if((stats.hp - calculatedMonsterDamage) <= 0) {
          // if it did, game over
          store.dispatch({
            type: 'GAME_OVER',
            payload: {}
          })
        }
      } else {
        // no player in range, time to move!
        // get the monsters actual position in pixels
        let position = [monsterPos[1] * SPRITE_SIZE, monsterPos[0] * SPRITE_SIZE];

        // if the monster is below the player on the y axis
        if(position[1] > player.position[1]) {
          // move the monster 'up' relatively
          moveMonster('up', position, currentMap, id);
        }
        // if the monster is above the player on the y axis
        else if(position[1] < player.position[1]) {
          // move the monster 'down' relatively
          moveMonster('down', position, currentMap, id);
        }
        // if the monster is to the right of the player
        else if(position[0] > player.position[0]) {
          // move the monster 'left' relatively
          moveMonster('left', position, currentMap, id);
        }
        // if the monster is to the left of the player
        else if(position[0] < player.position[0]) {
          // move the monster 'right' relatively
          moveMonster('right', position, currentMap, id);
        }
      }
    } else {
      // monster is too far away from the player
      store.dispatch({
        type: 'HIDE_MONSTER',
        payload: { id, map: currentMap }
      })

      let randomDirection = getRandomDirection();
      // move the monster in a random direction
      moveMonster(randomDirection, position, currentMap, id);
    }
  });
}
