
const initialState = {
  notEnoughGold: ''
};

const snackbarReducer = (state = initialState, action) => {

  let newState = Object.assign({}, state);

  switch(action.type) {

    case 'NOT_ENOUGH_GOLD':
      newState.notEnoughGold = action.payload.name;

      return newState;

    case 'RESET':
      return {
        notEnoughGold: ''
      };

    default:
      return state;
  }
};

export default snackbarReducer;
