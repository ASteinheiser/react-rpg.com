
const initialState = {
  currentMap: 0,
  gameOver: false
};

const worldReducer = (state = initialState, action) => {

  let newState = Object.assign({}, state);

  switch(action.type) {

    case 'GAME_OVER':
      newState.gameOver = true;

      return newState;

    case 'LOAD_NEXT_MAP':
      newState.currentMap += 1;

      return newState;
    default:
      return state;
  }
};

export default worldReducer;
