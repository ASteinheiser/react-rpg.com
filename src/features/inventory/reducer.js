import { uuidv4 } from '../../modules/uuid-v4';

const initialState = {
  items: [],
  maxItems: 8,
  itemDropped: '',
  itemReceived: '',
  tooManyItems: ''
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
        return false;
      });

      newState.itemDropped = item.name;

      return newState;

    case 'GET_ITEM':
      let itemId = uuidv4();
      // if there's room in the inventory
      if(state.items.length < state.maxItems) {
        // save item to list with unique id for keeping track of duplicates
        newState.items.push(Object.assign({}, action.payload, { id: itemId }));

        newState.itemReceived = action.payload.name;
      } else {
        // show player that they have too many items
        newState.tooManyItems = action.payload.name;
      }

      return newState;

    case 'RESET':
      return {
        items: [],
        maxItems: 9,
        itemDropped: '',
        itemReceived: ''
      };

    default:
      return state;
  }
};

export default inventoryReducer;
