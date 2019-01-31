const initialState = {
  tiles: [],
  sightBox: []
};

const mapReducer = (state = initialState, action) => {

  let newState = Object.assign({}, state);

  switch(action.type) {

    case 'EXPLORE_TILES':
      const { tiles } = action.payload;
      // get each tile
      tiles.forEach(tile => {
        // set it's value to explored
        newState.tiles[tile[0]][tile[1]].explored = 1;
      });
      // set tiles for current sight box
      newState.sightBox = tiles;
      return newState;

    case 'ADD_BLOOD_SPILL':
      // we need this check to not override chests, stairs, etc.
      // check if the next tile is an empty one
      if(state.tiles[action.payload.y][action.payload.x].value === 0) {
        // set current tile to blood spill tile
        newState.tiles[action.payload.y][action.payload.x].value = -1;
      }
      return newState;

    case 'OPEN_CHEST':
      // set current chest to ground tile
      newState.tiles[action.payload.y][action.payload.x].value = -2;
      return newState;

    // load a new map of tiles
    case 'ADD_TILES':
    action.payload.tiles.forEach((row, index) => {
      action.payload.tiles[index].forEach((item, tileIndex) => {
        if(typeof action.payload.tiles[index][tileIndex] !== 'object') {
          action.payload.tiles[index][tileIndex] = {
              // give each tile a 'value'
              value: action.payload.tiles[index][tileIndex],
              // this is used for showing visited tiles
              explored: 0,
              // add a variation for tiles that allow for it (random num: 1 - 4)
              variation: Math.round(Math.random() * (4 - 1) + 1)
            };
          }
        });
      });

      return {
        ...action.payload
      };

    case 'RESET':
      return initialState;

    default:
      return state;
  }
};

export default mapReducer;
