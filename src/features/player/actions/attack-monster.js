import { checkForMonster, getNewPosition, observeBoundaries } from './move-player';
import calculateDamage from '../../../utils/calculate-damage';
import calculateBonus  from '../../../utils/calculate-bonus';
import getNextTile     from '../../../utils/get-next-tile';
import { SPRITE_SIZE, killDragon, killGolem, killImp, killRat, killGoblin, killLich, MONSTER_KILLS } from '../../../config/constants';

export default function attackMonster() {
  return (dispatch, getState) => {

    // get player direction and the location of position to attack
    const { position, direction } = getState().player;
    const newPos = getNewPosition(position, direction);
    // if the attacked tile is in bounds
    if(observeBoundaries(newPos) && observeImpassable(newPos)) {
      // if theres a monster
      const monsterId = dispatch(checkForMonster(newPos));
      if(monsterId) {
        const { stats, world, monsters } = getState();
        const { currentMap } = world;
        const { components } = monsters;
        const { weapon } = stats.equippedItems;
        const weaponBonus = weapon ? weapon.bonus : null;
        // get monster
        const currMonster = components[currentMap][monsterId];
        const monsterPos = currMonster.position;
        // gather stats
        const monsterDefence = currMonster.defence;
        const monsterType = currMonster.type;
        const playerDamage = stats.damage;
        const damage = calculateDamage(calculateBonus(playerDamage, monsterType, weaponBonus), monsterDefence);
        // show sword swing
        dispatch({
          type: 'PLAYER_ATTACK',
          payload: null
        });
        // deal damage to monster
        dispatch({
          type: 'DAMAGE_TO_MONSTER',
          payload: {
            damage,
            id: currMonster.id,
            map: currentMap
          }
        });

        // check if monster died
        if((currMonster.hp - damage) <= 0) {
          if(currMonster.type === "dragon"){
            killDragon();
            //console.log("Killed: " + MONSTER_KILLS.dragon + " Dragon(s)");
          }
          else if(currMonster.type === "goblin"){
            killGoblin();
            //console.log("Killed: " + MONSTER_KILLS.goblin + " Goblin(s)");
          }
          else if(currMonster.type === 'imp'){
            killImp();
            //console.log("Killed: " + MONSTER_KILLS.imp + " Imp(s)");
          }
          else if(currMonster.type === 'lich'){
            killLich();
            //console.log("Killed: " + MONSTER_KILLS.lich + " Lich");
          }
          else if(currMonster.type === 'rat'){
            killRat();
            //console.log("Killed: " + MONSTER_KILLS.rat + " Rat(s)");
          }
          else if(currMonster.type === 'stone-golem'){
            killGolem();
            //console.log("Killed: " + MONSTER_KILLS.golem + " Stone Golem(s)");
          }

          // and get some exp
          dispatch({
            type: 'GET_EXP',
            payload: currMonster.exp
          });
          // play death sound
          dispatch({
            type: 'MONSTER_DIED',
            payload: null
          });
          // replace monster will blood spill
          // need to pass relative tile index
          dispatch({
            type: 'ADD_BLOOD_SPILL',
            payload: {
              x: monsterPos[0] / SPRITE_SIZE,
              y: monsterPos[1] / SPRITE_SIZE
            }
          });
        }

        // take a turn if the player attacked something
        dispatch({
          type: 'TAKE_TURN',
          payload: null
        });
      } // no monster, just show sword swing
      else {
        dispatch({
          type: 'PLAYER_ATTACK',
          payload: null
        });
      }
    }

    function observeImpassable(newPos) {
      const nextTile = getNextTile(getState().world, newPos);

      return nextTile < 5;
    }
  };
}
