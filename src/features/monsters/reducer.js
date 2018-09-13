import React from 'react';

import Goblin     from './goblin';
import StoneGolem from './stone-golem';

import { uuidv4 } from '../../modules/uuid-v4.js';

const initialState = {
  components: []
};

const monstersReducer = (state = initialState, action) => {

  let newState = Object.assign({}, state);

  switch(action.type) {

    // load a new set of monsters
    case 'ADD_MONSTERS':
      let { monsters } = action.payload;

      // leave the old monsters behind...
      newState.components = [];
      // render monsters
      monsters.forEach(monster => {
        // generate a unique id (for tracking purposes)
        let uuid = uuidv4();

        switch(monster.type) {
          case 'goblin':
            newState.components.push( <Goblin monster={monster} key={uuid} /> );
            break;
          case 'stone-golem':
            newState.components.push( <StoneGolem monster={monster} key={uuid} /> );
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
