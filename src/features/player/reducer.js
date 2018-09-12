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

    case 'MOVE_OPPOSITE':
      const { border } = action.payload;

      switch(border) {
        case 'NORTH':
          newState.position[1] = (MAP_HEIGHT - SPRITE_SIZE);
          break;
        case 'SOUTH':
          newState.position[1] = 0;
          break;
        case 'WEST':
          newState.position[0] = (MAP_WIDTH - SPRITE_SIZE);
          break;
        case 'EAST':
          newState.position[0] = 0;
          break;
        default:
      }

      return newState;

    case 'MOVE_PLAYER':
      return {
        ...action.payload
      }

    default:
      return state;
  }
};

export default playerReducer;
