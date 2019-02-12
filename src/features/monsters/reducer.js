import React      from 'react';
import _cloneDeep from 'lodash.clonedeep';

import Monsters        from '../../data/monsters';
import { SPRITE_SIZE } from '../../config/constants';
import { uuidv4 }      from '../../modules/uuid-v4.js';

const initialState = {
  components: {}
};

const monstersReducer = (state = initialState, action) => {

  let newState;

  switch(action.type) {

    case 'MOVE_MONSTER':
      newState = _cloneDeep(state);
      const updateMove = action.payload;

      newState.components[updateMove.map][updateMove.id].props.monster.position = updateMove.position;

      return newState;

    case 'DAMAGE_TO_MONSTER':
      newState = _cloneDeep(state);
      const updateDmg = action.payload;
      // subtract the damage from monster hp
      newState.components[updateDmg.map][updateDmg.id].props.monster.hp -= updateDmg.damage;
      // if monster has 0 or less hp, kill it
      if(newState.components[updateDmg.map][updateDmg.id].props.monster.hp <= 0) {
        delete newState.components[updateDmg.map][updateDmg.id];
      }

      return newState;

    // load a new set of monsters
    case 'ADD_MONSTERS':
      newState = _cloneDeep(state);
      const addMonster = action.payload;
      // save monsters by the map
      if(!newState.components[addMonster.map]) {
        newState.components[addMonster.map] = {};
        // render monsters
        addMonster.monsters.forEach(monster => {
          // generate a unique id (for tracking purposes)
          let uuid = uuidv4();
          monster.id = uuid;
          // merge the initial position with monster stats
          monster = Object.assign({}, monster, Monsters[monster.type].stats);
          // set the position from tile(x,y) to actual pixel size
          monster.position = monster.position.map(value => value * SPRITE_SIZE);
          // set component key with monster id
          const { Comp } = Monsters[monster.type];
          newState.components[addMonster.map][uuid] = ( <Comp monster={monster} key={uuid} /> );
        });
      }

      return newState;

    case 'REVEAL_MONSTER':
      newState = _cloneDeep(state);

      newState.components[action.payload.map][action.payload.id].props.monster.visible = true;
      return newState;

    case 'HIDE_MONSTER':
      newState = _cloneDeep(state);

      newState.components[action.payload.map][action.payload.id].props.monster.visible = false;
      return newState;

    case 'RESET':
      return initialState;

    case 'persist/REHYDRATE':
      if(!action.payload) return state;

      newState = _cloneDeep(state);
      const { components } = action.payload.monsters;
      const maps = Object.keys(components);

      // return if there are no maps persisted
      if(maps.length === 0) return state;

      // find the monster data on each map and load the react components
      for(let i = 0; i < maps.length; i ++) {
        const monstersForMap = components[maps[i]];
        newState.components[maps[i]] = {};
        for(let j = 0; j < Object.keys(monstersForMap).length; j ++) {
          const monsterObj = monstersForMap[Object.keys(monstersForMap)[j]];
          const monster = monsterObj.props.monster;
          // set component key with monster id
          const { Comp } = Monsters[monster.type];
          newState.components[maps[i]][monsterObj.key] = ( <Comp monster={monster} key={monsterObj.key} /> );
        }
      }
      return newState;

    default:
      return state;
  }
};

export default monstersReducer;
