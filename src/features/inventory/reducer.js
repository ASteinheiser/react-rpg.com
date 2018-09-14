import { uuidv4 } from '../../modules/uuid-v4';

const initialState = {
  items: [],
  maxItems: 9
};

const inventoryReducer = (state = initialState, action) => {

  let newState = Object.assign({}, state);

  switch(action.type) {

    case 'RECEIVE_ITEM':
      let itemId = uuidv4();
      // save item to list with unique id for keeping track of duplicates
      newState.items.push(Object.assign({}, action.payload, { id: itemId }));

      return newState;

    case 'RESET':
      return {
        items: [],
        maxItems: 9
      };

    default:
      return state;
  }
};

export default inventoryReducer;
