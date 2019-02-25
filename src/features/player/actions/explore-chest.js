
export default function exploreChest(x, y) {
  return dispatch => {
    // replace the closed chest img with open
    dispatch({
      type: 'OPEN_CHEST',
      payload: { x, y }
    });
    // show the chest contents
    dispatch({
      type: 'PAUSE',
      payload: {
        pause: true,
        chest: true
      }
    });
  };
}
