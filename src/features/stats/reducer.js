
const initialState = {
  hp: 10,
  maxHp: 10,
  damage: 2,
  level: 0,
  exp: 0,
  expToLevel: 20
};

const statsReducer = (state = initialState, action) => {
  switch(action.type) {
    default:
      return state;
  }
};

export default statsReducer;
