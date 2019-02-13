import _cloneDeep from 'lodash.clonedeep';

import { MAP_DIMENSIONS } from '../../config/constants';

const initialState = {
  tiles: [],
  sightBox: [],
  paddingSightBox: [],
  paddingTiles: {
    left: [],
    right: [],
    top: [],
    bottom: []
  }
};

const mapReducer = (state = initialState, action) => {

  let newState;

  switch(action.type) {

    case 'EXPLORE_TILES':
      newState = _cloneDeep(state);
      const { tiles, paddingTiles } = action.payload;
      // get each tile
      tiles.forEach(tile => {
        // set it's value to explored
        newState.tiles[tile[0]][tile[1]].explored = 1;
      });
      // set tiles for current sight box
      newState.sightBox = tiles;
      // set tiles for current padding sight box
      newState.paddingSightBox = paddingTiles;
      // make a new array of the padding tiles location as strings
      const paddTiles = paddingTiles.map(JSON.stringify);
      // check each padding tile direction and see if any
      // tiles are contained in the new sightbox
      if(paddTiles.length > 0) {
        Object.keys(state.paddingTiles).forEach(direction => {
          newState.paddingTiles[direction] = state.paddingTiles[direction].map(tileRow => {
            return tileRow.map(tile => {
              if(paddTiles.indexOf(JSON.stringify(tile.location)) > -1) tile.explored = 1;
              return tile;
            });
          });
        });
      }

      return newState;

    case 'ADD_BLOOD_SPILL':
      newState = _cloneDeep(state);
      // we need this check to not override chests, stairs, etc.
      // check if the next tile is an empty one
      if(state.tiles[action.payload.y][action.payload.x].value === 0) {
        // set current tile to blood spill tile
        newState.tiles[action.payload.y][action.payload.x].value = -1;
      }
      return newState;

    case 'OPEN_CHEST':
      newState = _cloneDeep(state);
      // set current chest to ground tile
      newState.tiles[action.payload.y][action.payload.x].value = -2;
      return newState;

    case 'ADD_TILES':
      // we need to add padding tiles so the
      // player cannot see past the edge of the map
      let top = [];
      let bottom = [];
      let left = [];
      let right = [];

      for(let i = 0; i < 5; i ++) {
        let topRow = [];
        let bottomRow = [];
        for(let j = 0; j < 20; j ++) {
          topRow.push({
            location: [(-i) + (-1), j],
            explored: 0,
            variation: Math.round(Math.random() * (4 - 1) + 1)
          });
          bottomRow.push({
            location: [i + MAP_DIMENSIONS[0], j],
            explored: 0,
            variation: Math.round(Math.random() * (4 - 1) + 1)
          });
        }
        top.push(topRow);
        bottom.push(bottomRow);
      }

      for(let i = 0; i < 25; i ++) {
        let leftRow = [];
        let rightRow = [];
        for(let j = 0; j < 5; j ++) {
          leftRow.push({
            location: [i - 5, j - 5],
            explored: 0,
            variation: Math.round(Math.random() * (4 - 1) + 1)
          });
          rightRow.push({
            location: [i - 5, j + MAP_DIMENSIONS[1]],
            explored: 0,
            variation: Math.round(Math.random() * (4 - 1) + 1)
          });
        }
        left.push(leftRow);
        right.push(rightRow);
      }

      return {
        ...state,
        paddingTiles: { top, bottom, left, right },
        ...action.payload
      };

    case 'RESET':
      return initialState;

    default:
      return state;
  }
};

export default mapReducer;
