
const initialState = {
  hp: 10,
  damage: 3,
  level: 0,
  exp: 0,
};

const statsReducer = (state = initialState, action) => {
  switch(action.type) {
    default:
      return state;
  }
};

export default statsReducer;
