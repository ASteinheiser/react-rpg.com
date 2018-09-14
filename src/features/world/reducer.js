import maps  from '../../data/maps';

const initialState = {
  currentMap: '1_1',
  gameOver: false
};

const worldReducer = (state = initialState, action) => {

  let newState = Object.assign({}, state);

  switch(action.type) {

    case 'GAME_OVER':
      newState.gameOver = true;

      return newState;

    case 'LOAD_NEXT_MAP':
      const { direction } = action.payload;
      const { currentMap } = newState;

      let { stairs } = maps[currentMap];

      newState.currentMap = stairs[direction];

      return newState;
    default:
      return state;
  }
};

export default worldReducer;
