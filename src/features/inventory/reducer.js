import { uuidv4 } from '../../modules/uuid-v4';

const initialState = {
  items: [],
  maxItems: 9
};

const inventoryReducer = (state = initialState, action) => {

  let newState = Object.assign({}, state);

  switch(action.type) {

    case 'DROP_ITEM':
      let item = action.payload;
      // check each item
      newState.items.find((itemData, index) => {
        // if you found the item
        if(newState.items[index] === item) {
          // remove it from the array
          return newState.items.splice(index, 1);
        }
      });

      return newState;

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
