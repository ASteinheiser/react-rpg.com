
const initialState = {
  position: [0, 0],
  stats: {
    hp: 10,
    mana: 5,
    level: 0,
    exp: 0
  }
};

const playerReducer = (state = initialState, action) => {
  switch(action.type) {
    default:
      return state;
  }
};

export default playerReducer;
