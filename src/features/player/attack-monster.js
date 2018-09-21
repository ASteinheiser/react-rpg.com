import store           from '../../config/store';
import { SPRITE_SIZE } from '../../config/constants';
import calculateDamage from '../../modules/calculate-damage';
import calculateBonus  from '../../modules/calculate-bonus';

export default function attackMonster(monsterPos, currMonster) {
  const { currentMap } = store.getState().world;
  const { stats } = store.getState();
  // gather stats
  let monsterDamage = currMonster.damage;
  let monsterDefence = currMonster.defence;
  let monsterType = currMonster.type;
  let playerDamage = stats.damage;
  let playerDefence = stats.defence;
  // calculate damage
  let calculatedMonsterDamage = calculateDamage(monsterDamage, playerDefence);
  // deal damage to monster
  store.dispatch({
    type: 'DAMAGE_TO_MONSTER',
    payload: {
      id: currMonster.id,
      damage: calculateDamage(calculateBonus(playerDamage, monsterType), monsterDefence),
      map: currentMap
    }
  })
  // deal damage to player
  store.dispatch({
    type: 'DAMAGE_TO_PLAYER',
    payload: {
      damage: calculatedMonsterDamage
    }
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
  // check if player died
  if((stats.hp - calculatedMonsterDamage) <= 0) {
    // if it did, game over
    store.dispatch({
      type: 'GAME_OVER',
      payload: {}
    })
  }
}
