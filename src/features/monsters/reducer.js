import React from 'react';

import Monsters        from '../../data/monsters';
import { SPRITE_SIZE } from '../../config/constants';
import { uuidv4 }      from '../../modules/uuid-v4.js';

const initialState = {
  components: {}
};

const monstersReducer = (state = initialState, action) => {

  let newState = Object.assign({}, state);

  switch(action.type) {

    case 'MOVE_MONSTER':
      let update = action.payload;

      newState.components[update.map][update.id].props.monster.position = update.position;

      return newState;

    case 'KILL_MONSTER':
      delete newState.components[action.payload.map][action.payload.id];

      return newState;

    // deal damage to individual monster
    case 'DAMAGE_TO_MONSTER':
      const { id, damage } = action.payload;
      // deal damage to monster
      newState.components[action.payload.map][id].props.monster.hp -= damage;

      return newState;

    // load a new set of monsters
    case 'ADD_MONSTERS':
      let { monsters, map } = action.payload;
      // save monsters by the map
      if(!newState.components[map]) {
        newState.components[map] = {};
        // render monsters
        monsters.forEach(monster => {
          // generate a unique id (for tracking purposes)
          let uuid = uuidv4();
          monster.id = uuid;
          // merge the initial position with monster stats
          monster = Object.assign({}, monster, Monsters[monster.type].stats);
          // set the position from tile(x,y) to actual pixel size
          monster.position = monster.position.map(value => value * SPRITE_SIZE);
          // set component key with monster id
          const { Comp } = Monsters[monster.type];
          newState.components[map][uuid] = ( <Comp monster={monster} key={uuid} /> );
        });
      }

      return newState;

    case 'REVEAL_MONSTER':
      // update the current monster's visible prop
      newState.components[action.payload.map][action.payload.id].props.monster.visible = true;
      return newState;

    case 'HIDE_MONSTER':
      // update the current monster's visible prop
      newState.components[action.payload.map][action.payload.id].props.monster.visible = false;
      return newState;

    case 'RESET':
      return {
        components: {}
      };

    case 'persist/REHYDRATE':
      if(!action.payload) return state;

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
