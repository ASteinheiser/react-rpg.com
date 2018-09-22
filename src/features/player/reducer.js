
const initialState = {
  direction: 'SOUTH',
  position: [0, 0],
  playerMoved: false,
  playerAttacked: false
};

const playerReducer = (state = initialState, action) => {

  let newState = Object.assign({}, state);

  switch(action.type) {

    case 'PLAYER_ATTACK':
      // trigger attack animation
      newState.playerAttacked = !state.playerAttacked;
      return newState;

    case 'MOVE_PLAYER':
      return {
        // trigger move animation
        playerMoved: !state.playerMoved,
        // dont trigger attack
        playerAttacked: state.playerAttacked,
        ...action.payload
      }

    case 'RESET':
      return initialState;

    default:
      return state;
  }
};

export default playerReducer;
