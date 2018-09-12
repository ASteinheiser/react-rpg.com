
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
    case 'MOVE_PLAYER':
      return {
        ...action.payload
      }
    default:
      return state;
  }
};

export default playerReducer;
