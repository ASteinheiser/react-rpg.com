
const initialState = {
  currentMap: 0
};

const worldReducer = (state = initialState, action) => {

  let newState = Object.assign({}, state);

  switch(action.type) {
    case 'LOAD_NEXT_MAP':
      newState.currentMap += 1;

      return newState;
    default:
      return state;
  }
};

export default worldReducer;
