
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
      let exp = action.payload.value;
      newState.exp += exp;

      return newState;

    default:
      return state;
  }
};

export default statsReducer;
