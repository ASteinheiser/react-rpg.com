
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

    case 'DAMAGE_TO_PLAYER':
      const { damage } = action.payload;
      // deal damage to player
      newState.hp -= damage;
      // check if that killed the player
      if(newState.hp <= 0) {
        // if it did, game over
        console.log('game over');
      }
      return newState;

    case 'GET_EXP':
      let newExp = action.payload.value;
      let newTotalExp = state.exp + newExp;
      let expToLevel = state.expToLevel;
      // if they are leveling up
      if(newTotalExp >= expToLevel) {
        // increment level
        newState.level += 1;

        // calculate leftover exp if it isn't exactly enough
        if(!(newState.exp === expToLevel)) {
          let leftoverExp = (newTotalExp) % expToLevel;
          newState.exp = leftoverExp;
        }

        // set next exp goal to be 1.5 times as much
        newState.expToLevel = state.expToLevel * 1.5;

        // get more maxHp and currHp (roll 1-5)
        let moreHp = Math.floor(Math.random() * 5) + 1;
        newState.hp += moreHp;
        newState.maxHp += moreHp;

        // get more damage (+1)
        newState.damage += 1;

      } else {
        // they aren't leveling up
        newState.exp += newExp;
      }

      return newState;

    default:
      return state;
  }
};

export default statsReducer;
