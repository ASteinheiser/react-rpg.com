const initialState = {
  tiles: []
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
      return newState;

    case 'ADD_BLOOD_SPILL':
      // set current tile to blood spill tile
      newState.tiles[action.payload.y][action.payload.x].value = -1;
      return newState;

    case 'OPEN_CHEST':
      // set current chest to ground tile
      newState.tiles[action.payload.y][action.payload.x].value = -2;
      return newState;

    // load a new map of tiles
    case 'ADD_TILES':
      // give each tile a 'value' and 'explored' attribute
      // this is used for showing visited tiles
      action.payload.tiles.forEach((row, index) => {
        action.payload.tiles[index].forEach((item, tileIndex) => {
          if(typeof action.payload.tiles[index][tileIndex] !== 'object') {
            action.payload.tiles[index][tileIndex] = {
              value: action.payload.tiles[index][tileIndex],
              explored: 0
            };
          }
        });
      });

      return {
        ...action.payload
      };

    default:
      return state;
  }
};

export default mapReducer;
