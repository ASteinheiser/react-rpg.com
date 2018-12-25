import store           from '../../config/store';
import { SPRITE_SIZE } from '../../config/constants';
import calculateDamage from '../../modules/calculate-damage';
import calculateBonus  from '../../modules/calculate-bonus';
import { checkForMonster, getNewPosition, observeBoundaries } from './movement';

function observeImpassable(oldPos, newPos) {
  const tiles = store.getState().map.tiles;
  const y = newPos[1] / SPRITE_SIZE;
  const x = newPos[0] / SPRITE_SIZE;

  const nextTile = tiles[y] ? tiles[y][x].value : 5;

  return nextTile < 5;
}

export default function attackMonster() {
  // get current redux state
  const currState = store.getState();
  // get player direction and the location of position to attack
  const { position, direction } = currState.player;
  const newPos = getNewPosition(position, direction);
  // if the attacked tile is in bounds
  if(observeBoundaries(position, newPos) && observeImpassable(position, newPos)) {
    // if theres a monster
    let monsterId = checkForMonster(newPos);
    if(monsterId) {
      const { currentMap } = currState.world;
      const monsters = currState.monsters.components;
      const { stats } = currState;
      const { weapon } = stats.equippedItems;
      // get monster
      let currMonster = monsters[currentMap][monsterId].props.monster;
      let monsterPos = currMonster.position;
      // gather stats
      let monsterDefence = currMonster.defence;
      let monsterType = currMonster.type;
      let playerDamage = stats.damage;
      // deal damage to monster
      store.dispatch({
        type: 'DAMAGE_TO_MONSTER',
        payload: {
          id: currMonster.id,
          damage: calculateDamage(calculateBonus(playerDamage, monsterType, weapon.bonus), monsterDefence),
          map: currentMap
        }
      })
      // show sword swing
      store.dispatch({
        type: 'PLAYER_ATTACK',
        payload: {}
      })

      // check if monster died
      if(currMonster.hp <= 0) {
        // if it did, remove the monster component
        store.dispatch({
          type: 'KILL_MONSTER',
          payload: { id: currMonster.id, map: currentMap }
        })
        // and get some exp
        store.dispatch({
          type: 'GET_EXP',
          payload: { value: currMonster.exp }
        })
        // play death sound
        store.dispatch({
          type: 'MONSTER_DIED',
          payload: {}
        })
        // replace monster will blood spill
        // need to pass relative tile index
        store.dispatch({
          type: 'ADD_BLOOD_SPILL',
          payload: {
            x: monsterPos[0] / SPRITE_SIZE,
            y: monsterPos[1] / SPRITE_SIZE
          }
        })
      }

      // take a turn if the player attacked something
      store.dispatch({
        type: 'TAKE_TURN',
        payload: {}
      });
    } else {
      // no monster, just show sword swing
      store.dispatch({
        type: 'PLAYER_ATTACK',
        payload: {}
      })
    }
  }
}
