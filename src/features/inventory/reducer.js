import _cloneDeep from 'lodash.clonedeep';

import { MAX_ITEMS } from '../../config/constants';
import uuidv4        from '../../utils/uuid-v4';

const initialState = {
  items: [],
  maxItems: MAX_ITEMS
};

const inventoryReducer = (state = initialState, { type, payload }) => {

  let newState;

  switch(type) {

    case 'DROP_ITEM':
      newState = _cloneDeep(state);
      let item = payload;

      newState.items.find((itemData, index) => {
        // if you found the item
        if(JSON.stringify(itemData) === JSON.stringify(item)) {
          // remove it from the array
          return newState.items.splice(index, 1);
        }
        return false;
      });

      return newState;

    case 'GET_ITEM':
      newState = _cloneDeep(state);
      let itemId = uuidv4();
      // save item to list with unique id for keeping track of duplicates
      newState.items.push({ ...payload, id: itemId });

      return newState;

    case 'UPGRADE_PACK':
      return {
        ...state,
        maxItems: state.maxItems + payload.slots
      };

    case 'RESET':
      return initialState;

    default:
      return state;
  }
};

export default inventoryReducer;
