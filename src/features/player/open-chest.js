import React     from 'react';
import ChestLoot from '../../components/chest-loot';
import store     from '../../config/store';

export default function openChest(x, y) {
  // replace the closed chest img with open
  store.dispatch({
    type: 'OPEN_CHEST',
    payload: { x, y }
  })
  // show the chest contents
  store.dispatch({
    type: 'PAUSE',
    payload: { component: <ChestLoot /> }
  })
}
