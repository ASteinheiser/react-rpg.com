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
      }
    } else {
      store.dispatch({
        type: 'HIDE_MONSTER',
        payload: { id, map: currentMap }
      })
    }
  });
}
