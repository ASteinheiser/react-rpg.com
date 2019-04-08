

import { playerDies, monsterKillReset, setHighscore } from '../../config/constants';

const initialState = {
  direction: 'SOUTH',
  position: [0, 0],
  playerMoved: false,
  playerAttacked: false,
  monsterAttacked: false,
  playerDied: false,
  playerDeaths: 0,
  monsterDied: false
};

export const playerReducer = (state = initialState, { type, payload }) => {

  switch(type) {

    case 'MONSTER_DIED':
      // trigger monster's death sound
      return { ...state, monsterDied: !state.monsterDied};

    case 'PLAYER_DIED':
      // trigger player's death sound, death count increment, set a highscore if applicable, reset monster kills
      playerDies();
      setHighscore();
      monsterKillReset();
      return { ...state, playerDied: !state.playerDied, playerDeaths: state.playerDeaths+1 };

    case 'MONSTER_ATTACK':
      // trigger monster's attack animation on player
      return { ...state, monsterAttacked: !state.monsterAttacked };

    case 'PLAYER_ATTACK':
      // trigger attack animation
      return { ...state, playerAttacked: !state.playerAttacked };

    case 'MOVE_PLAYER':
      return {
        ...state,
        playerMoved: !state.playerMoved,
        ...payload
      };

    case 'RESET':
      return initialState;

    default:
      return state;
  }
};

export default playerReducer;
