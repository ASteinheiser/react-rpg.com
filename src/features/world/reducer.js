import maps  from '../../data/maps';

const initialState = {
  currentMap: '1_1',
  gameOver: false,
  paused: false,
  inventory: false
};

const worldReducer = (state = initialState, action) => {

  let newState = Object.assign({}, state);

  switch(action.type) {

    // set the paused prop to the dialog component
    case 'PAUSE':
      newState.inventory = action.payload.inventory || false;
      newState.paused = action.payload.component;

      return newState;

    case 'GAME_OVER':
      newState.gameOver = true;
      newState.paused = true;

      return newState;

    case 'LOAD_NEXT_MAP':
      const { direction } = action.payload;
      const { currentMap } = newState;

      let { stairs } = maps[currentMap];

      newState.currentMap = stairs[direction];

      return newState;

    case 'RESET':
      return initialState;

    default:
      return state;
  }
};

export default worldReducer;
