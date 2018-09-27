
const initialState = {
  direction: 'SOUTH',
  position: [0, 0],
  playerMoved: false,
  playerAttacked: false,
  monsterAttacked: false,
  playerDied: false,
  monsterDied: false,
};

const playerReducer = (state = initialState, action) => {

  let newState = Object.assign({}, state);

  switch(action.type) {

    case 'MONSTER_DIED':
      // trigger monster's death sound
      newState.monsterDied = !state.monsterDied;
      return newState;

    case 'PLAYER_DIED':
      // trigger player's death sound
      newState.playerDied = !state.playerDied;
      return newState;

    case 'MONSTER_ATTACK':
      // trigger monster's attack animation on player
      newState.monsterAttacked = !state.monsterAttacked;
      return newState;

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
        // or monster attack
        monsterAttacked: state.monsterAttacked,
        // or monster death sound
        monsterDied: state.monsterDied,
        // or player death sound
        playerDied: state.playerDied,
        ...action.payload
      }

    case 'RESET':
      return initialState;

    default:
      return state;
  }
};

export default playerReducer;
