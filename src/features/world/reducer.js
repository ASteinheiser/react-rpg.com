import maps       from '../../data/maps';
import _cloneDeep from 'lodash.clonedeep';

import attachMetaToTiles from '../../modules/attach-meta-to-tiles';

const initialState = {
  currentMap: null,
  gameMode: null,
  turn: 0,
  sound: true,
  storyMaps: {},
  randomMaps: [],
  floorNum: null
};

const worldReducer = (state = initialState, action) => {

  let newState;

  switch(action.type) {

    case 'EXPLORE_TILES':
      newState = _cloneDeep(state);
      const { tiles } = action.payload;
      // get each tile
      tiles.forEach(tile => {
        if(newState.gameMode === 'story') {
          newState.storyMaps[newState.currentMap].tiles[tile[0]][tile[1]].explored = 1;
        } else {
          newState.randomMaps[newState.floorNum - 1].tiles[tile[0]][tile[1]].explored = 1;
        }
      });

      // // make a new array of the padding tiles location as strings
      // const paddTiles = paddingTiles.map(JSON.stringify);
      // // check each padding tile direction and see if any
      // // tiles are contained in the new sightbox
      // if(paddTiles.length > 0) {
      //   Object.keys(state.paddingTiles).forEach(direction => {
      //     newState.paddingTiles[direction] = state.paddingTiles[direction].map(tileRow => {
      //       return tileRow.map(tile => {
      //         if(paddTiles.indexOf(JSON.stringify(tile.location)) > -1) tile.explored = 1;
      //         return tile;
      //       });
      //     });
      //   });
      // }

      return newState;

    case 'LOAD_STORY_MAPS':
      let _maps = _cloneDeep(maps);
      // go over each story map and add explored values
      // and variation data to the tiles
      Object.keys(_maps).forEach(mapName => {

        const newTiles = attachMetaToTiles(_maps[mapName].tiles);

        _maps[mapName] = { ..._maps[mapName], tiles: newTiles };
      });

      return { ...state, storyMaps: _maps };

    case 'ADD_RANDOM_MAP':
      let _randomMaps = _cloneDeep(state.randomMaps);

      const randomTiles = attachMetaToTiles(action.payload.tiles);

      _randomMaps.push({
        tiles: randomTiles,
        id: action.payload.id
      });

      return { ...state, randomMaps: _randomMaps };

    case 'SET_SOUND':
      // turn on or off game sounds
      return { ...state, sound: action.payload.sound };

    case 'TAKE_TURN':
      // increment the turn
      return { ...state, turn: (state.turn + 1) };

    case 'LOAD_NEXT_MAP':
      const { direction, currentMap } = action.payload;

      const { stairs } = state.storyMaps[currentMap];

      return { ...state, currentMap: stairs[direction] };

    case 'SET_CURR_MAP':
      return {
        ...state,
        currentMap: action.payload.map,
        floorNum: action.payload.floorNum
      };

    case 'SET_START_MAP':
      const { startMap, gameMode, floorNum } = action.payload;

      return {
        ...state,
        gameMode,
        currentMap: startMap,
        floorNum: floorNum ? floorNum : state.floorNum
      };

    case 'RESET':
      return {
        ...initialState,
        sound: state.sound
      };

    default:
      return state;
  }
};

export default worldReducer;
