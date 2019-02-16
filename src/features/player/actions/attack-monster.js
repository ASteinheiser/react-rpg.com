import store           from '../../../config/store';
import { SPRITE_SIZE } from '../../../config/constants';
import calculateDamage from '../../../utils/calculate-damage';
import calculateBonus  from '../../../utils/calculate-bonus';
import { checkForMonster, getNewPosition, observeBoundaries } from './movement';

function observeImpassable(newPos) {
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
  if(observeBoundaries(position, newPos) && observeImpassable(newPos)) {
    // if theres a monster
    const monsterId = checkForMonster(newPos);
    if(monsterId) {
      const { currentMap } = currState.world;
      const monsters = currState.monsters.components;
      const { stats } = currState;
      const { weapon } = stats.equippedItems;
      const weaponBonus = weapon ? weapon.bonus : undefined;
      // get monster
      const currMonster = monsters[currentMap][monsterId].props.monster;
      const monsterPos = currMonster.position;
      // gather stats
      const monsterDefence = currMonster.defence;
      const monsterType = currMonster.type;
      const playerDamage = stats.damage;
      const damage = calculateDamage(calculateBonus(playerDamage, monsterType, weaponBonus), monsterDefence);
      // show sword swing
      store.dispatch({
        type: 'PLAYER_ATTACK',
        payload: {}
      });
      // deal damage to monster
      store.dispatch({
        type: 'DAMAGE_TO_MONSTER',
        payload: {
          damage,
          id: currMonster.id,
          map: currentMap
        }
      });

      // check if monster died
      if((currMonster.hp - damage) <= 0) {
        // and get some exp
        store.dispatch({
          type: 'GET_EXP',
          payload: { value: currMonster.exp }
        });
        // play death sound
        store.dispatch({
          type: 'MONSTER_DIED',
          payload: {}
        });
        // replace monster will blood spill
        // need to pass relative tile index
        store.dispatch({
          type: 'ADD_BLOOD_SPILL',
          payload: {
            x: monsterPos[0] / SPRITE_SIZE,
            y: monsterPos[1] / SPRITE_SIZE
          }
        });
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
      });
    }
  }
}
