
const initialState = {
  hp: 10,
  maxHp: 10,
  damage: 2,
  level: 0,
  exp: 0,
  expToLevel: 20
};

const statsReducer = (state = initialState, action) => {

  let newState = Object.assign({}, state);

  switch(action.type) {

    case 'GET_EXP':
      let newExp = action.payload.value;
      let newTotalExp = state.exp + newExp;
      let expToLevel = state.expToLevel;
      // if they are leveling up
      if(newTotalExp >= expToLevel) {
        newState.level += 1;
        // calculate leftover exp if it isn't exactly enough
        if(!(newState.exp === expToLevel)) {
          let leftoverExp = (newTotalExp) % expToLevel;
          newState.exp = leftoverExp;
        }
        // set next exp goal to be 1.5 times as much
        newState.expToLevel = state.expToLevel * 1.5;
      } else { // they aren't leveling up
        newState.exp += newExp;
      }

      return newState;

    default:
      return state;
  }
};

export default statsReducer;
