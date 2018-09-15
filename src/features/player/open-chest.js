import store from '../../config/store';

export default function openChest(x, y) {
  // replace the closed chest img with open
  store.dispatch({
    type: 'OPEN_CHEST',
    payload: { x, y }
  })
  // get a random amount of gold between 3 and 10
  store.dispatch({
    type: 'GET_GOLD',
    payload: { value: Math.floor(Math.random() * 8) + 3 }
  })
  // TODO: make this level based
  // get some exp
  store.dispatch({
    type: 'GET_EXP',
    payload: { value: 10 }
  })
}
