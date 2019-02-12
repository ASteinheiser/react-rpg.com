
const initialState = {
  notEnoughGold: '',
  tooManyItems: '',
  itemDropped: '',
  itemReceived: ''
};

const snackbarReducer = (state = initialState, action) => {

  switch(action.type) {

    case 'NOT_ENOUGH_GOLD':
      return {
        ...state,
        notEnoughGold: `${action.payload.name}-${new Date().getTime()}`
      };

    case 'TOO_MANY_ITEMS':
      return {
        ...state,
        tooManyItems: `${action.payload.name}-${new Date().getTime()}`
      };

    case 'GET_ITEM':
      return {
        ...state,
        itemReceived: `${action.payload.name}-${new Date().getTime()}`
      };

    case 'DROP_ITEM':
      return {
        ...state,
        itemDropped: `${action.payload.name}-${new Date().getTime()}`
      };

    case 'RESET':
      return { ...initialState };

    default:
      return state;
  }
};

export default snackbarReducer;
