import {
  SPRITE_SIZE,
  MAP_WIDTH,
  MAP_HEIGHT
} from '../../config/constants';

const initialState = {
  spriteLocation: '0px 0px',
  direction: 'EAST',
  position: [0, 0],
  walkIndex: 0
};

const playerReducer = (state = initialState, action) => {

  let newState = Object.assign({}, state);

  switch(action.type) {

    case 'MOVE_PLAYER':
      return {
        ...action.payload
      }

    default:
      return state;
  }
};

export default playerReducer;
