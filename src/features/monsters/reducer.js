import React from 'react';

import Goblin, { goblinStats }         from './goblin';
import StoneGolem, { stoneGolemStats } from './stone-golem';

import { uuidv4 } from '../../modules/uuid-v4.js';

const initialState = {
  components: {}
};

const monstersReducer = (state = initialState, action) => {

  let newState = Object.assign({}, state);

  switch(action.type) {

    // deal damage to individual monster
    case 'DAMAGE_TO_MONSTER':
      const { id, damage } = action.payload;
      // deal damage to monster
      newState.components[id].props.monster.hp -= damage;
      // check if that killed the monster
      if(newState.components[id].props.monster.hp <= 0) {
        // if it did, remove the monster component
        delete newState.components[id];
      }
      return newState;

    // load a new set of monsters
    case 'ADD_MONSTERS':
      let { monsters } = action.payload;

      // leave the old monsters behind...
      newState.components = {};
      // render monsters
      monsters.forEach(monster => {
        // generate a unique id (for tracking purposes)
        let uuid = uuidv4();
        monster.id = uuid;

        switch(monster.type) {
          case 'goblin':
            // merge the initial position with monster stats
            monster = Object.assign({}, monster, goblinStats);
            // set component key with monster id
            newState.components[uuid] = ( <Goblin monster={monster} key={uuid} /> );
            break;
          case 'stone-golem':
            // merge the initial position with monster stats
            monster = Object.assign({}, monster, stoneGolemStats);
            // set component key with monster id
            newState.components[uuid] = ( <StoneGolem monster={monster} key={uuid} /> );
            break;
          default:
        }
      });

      return newState;

    default:
      return state;
  }
};

export default monstersReducer;
