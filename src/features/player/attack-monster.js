import store           from '../../config/store';
import { SPRITE_SIZE } from '../../config/constants';
import calculateDamage from '../../modules/calculate-damage';
import calculateBonus  from '../../modules/calculate-bonus';
import { checkForMonster, getNewPosition, observeBoundaries } from './movement';

function observeImpassable(oldPos, newPos) {
  const tiles = store.getState().map.tiles;
  const y = newPos[1] / SPRITE_SIZE;
  const x = newPos[0] / SPRITE_SIZE;

  const nextTile = tiles[y][x].value;

  return nextTile < 5;
}

export default function attackMonster() {
  // get player direction and the location of position to attack
  const { position, direction } = store.getState().player;
  const newPos = getNewPosition(position, direction);
  // if the attacked tile is in bounds
  if(observeBoundaries(position, newPos) && observeImpassable(position, newPos)) {
    // if theres a monster
    let monsterId = checkForMonster(newPos);
    if(monsterId) {
      const { currentMap } = store.getState().world;
      const { stats } = store.getState();
      const monsters = store.getState().monsters.components;
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
          damage: calculateDamage(calculateBonus(playerDamage, monsterType), monsterDefence),
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
    } else {
      // no monster, just show sword swing
      store.dispatch({
        type: 'PLAYER_ATTACK',
        payload: {}
      })
    }
    // after everything, take a turn
    store.dispatch({
      type: 'TAKE_TURN',
      payload: {}
    });
  }
}
