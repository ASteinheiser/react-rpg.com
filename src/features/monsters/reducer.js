import _cloneDeep from 'lodash.clonedeep';

import { SPRITE_SIZE } from '../../config/constants';
import monsterData     from '../../data/monsters';
import uuidv4          from '../../utils/uuid-v4.js';

const initialState = {
  components: {}
};

const monstersReducer = (state = initialState, { type, payload }) => {

  let newState;

  switch(type) {

    case 'MOVE_MONSTER':
      newState = _cloneDeep(state);

      newState.components[payload.map][payload.id].position = payload.position;

      return newState;

    case 'DAMAGE_TO_MONSTER':
      newState = _cloneDeep(state);
      // subtract the damage from monster hp
      newState.components[payload.map][payload.id].hp -= payload.damage;
      // if monster has 0 or less hp, kill it
      if(newState.components[payload.map][payload.id].hp <= 0) {
        delete newState.components[payload.map][payload.id];
      }

      return newState;

    // load a new set of monsters
    case 'ADD_MONSTERS':
      newState = _cloneDeep(state);
      // save monsters by the map
      if(!newState.components[payload.map]) {
        newState.components[payload.map] = {};
        // render monsters
        payload.monsters.forEach(monster => {
          // generate a unique id (for tracking purposes)
          const uuid = uuidv4();
          // merge the id, monster stats, and position
          // set the position from tile(x,y) to actual pixel size
          monster = {
            id: uuid,
            position: monster.position.map(value => value * SPRITE_SIZE),
            ...monsterData[monster.type]
          };
          newState.components[payload.map][uuid] = monster;
        });
      }

      return newState;

    case 'REVEAL_MONSTER':
      newState = _cloneDeep(state);

      newState.components[payload.map][payload.id].visible = true;
      return newState;

    case 'HIDE_MONSTER':
      newState = _cloneDeep(state);

      newState.components[payload.map][payload.id].visible = false;
      return newState;

    case 'RESET':
      return initialState;

    default:
      return state;
  }
};

export default monstersReducer;
