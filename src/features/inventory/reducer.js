import { MAX_ITEMS } from '../../config/constants';
import { uuidv4 }    from '../../modules/uuid-v4';

const initialState = {
  items: [],
  maxItems: MAX_ITEMS,
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

      newState.itemDropped = item.name + '-' + (new Date().getTime());

      return newState;

    case 'GET_ITEM':
      let itemId = uuidv4();
      // save item to list with unique id for keeping track of duplicates
      newState.items.push(Object.assign({}, action.payload, { id: itemId }));

      newState.itemReceived = action.payload.name + '-' + (new Date().getTime());

      return newState;

    case 'TOO_MANY_ITEMS':
      // display the message to the player
      newState.tooManyItems = action.payload.name + '-' + (new Date().getTime());

      return newState;

    case 'UPGRADE_PACK':
      newState.maxItems += action.payload.slots;
      return newState;

    case 'RESET':
      return {
        items: [],
        maxItems: MAX_ITEMS,
        itemDropped: '',
        itemReceived: ''
      };

    default:
      return state;
  }
};

export default inventoryReducer;
