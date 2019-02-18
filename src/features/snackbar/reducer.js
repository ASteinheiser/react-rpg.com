
const initialState = {
  notEnoughGold: '',
  tooManyItems: '',
  itemDropped: '',
  itemReceived: ''
};

const snackbarReducer = (state = initialState, { type, payload }) => {

  switch(type) {

    case 'NOT_ENOUGH_GOLD':
      return {
        ...state,
        notEnoughGold: `${payload.name}-${new Date().getTime()}`
      };

    case 'TOO_MANY_ITEMS':
      return {
        ...state,
        tooManyItems: `${payload.name}-${new Date().getTime()}`
      };

    case 'GET_ITEM':
      return {
        ...state,
        itemReceived: `${payload.name}-${new Date().getTime()}`
      };

    case 'DROP_ITEM':
      return {
        ...state,
        itemDropped: `${payload.name}-${new Date().getTime()}`
      };

    case 'RESET':
      return initialState;

    default:
      return state;
  }
};

export default snackbarReducer;
