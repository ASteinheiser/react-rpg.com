const initialState = {
  monsters: []
};

const monstersReducer = (state = initialState, action) => {

  switch(action.type) {

    // load a new set of monsters
    case 'ADD_MONSTERS':
      return {
        ...action.payload
      }

    default:
      return state;
  }
};

export default monstersReducer;
