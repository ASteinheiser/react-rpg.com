
const initialState = {
  notEnoughGold: ''
};

const snackbarReducer = (state = initialState, action) => {

  switch(action.type) {

    case 'NOT_ENOUGH_GOLD':
      // set the name of the item with a timestamp(for uniqueness)
      const notEnoughGold = `${action.payload.name}-${new Date().getTime()}`;

      return { ...state, notEnoughGold };

    case 'RESET':
      return { ...initialState };

    default:
      return state;
  }
};

export default snackbarReducer;
