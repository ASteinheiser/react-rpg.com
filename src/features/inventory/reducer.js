
const initialState = {
  items: [],
  maxItems: 9
};

const inventoryReducer = (state = initialState, action) => {

  let newState = Object.assign({}, state);

  switch(action.type) {

    case 'RECEIVE_ITEM':
      // save item to list
      newState.items.push(action.payload);

      return newState;

    case 'RESET':
      return {
        items: new Array(),
        maxItems: 9
      };

    default:
      return state;
  }
};

export default inventoryReducer;
