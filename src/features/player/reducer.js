
const initialState = {
  direction: 'SOUTH',
  position: [0, 0],
  playerMoved: false
};

const playerReducer = (state = initialState, action) => {

  switch(action.type) {

    case 'MOVE_PLAYER':
      return {
        playerMoved: !state.playerMoved,
        ...action.payload
      }

    case 'RESET':
      return initialState;

    default:
      return state;
  }
};

export default playerReducer;
