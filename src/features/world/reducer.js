import maps       from '../../data/maps';
import _cloneDeep from 'lodash.clonedeep';

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

  switch(action.type) {

    case 'LOAD_STORY_MAPS':
      let _maps = _cloneDeep(maps);
      // go over each story map and add explored values
      // and variation data to the tiles
      Object.keys(_maps).forEach(mapName => {

        const newTiles = _cloneDeep(_maps[mapName].tiles);

        newTiles.forEach((_, tileRowIndex) => {
          newTiles[tileRowIndex].forEach((_, tileIndex) => {
            newTiles[tileRowIndex][tileIndex] = {
              // give each tile a 'value'
              value: newTiles[tileRowIndex][tileIndex],
              // this is used for showing visited tiles
              explored: 0,
              // add a variation for tiles that allow for it (random num: 1 - 4)
              variation: Math.round(Math.random() * (4 - 1) + 1)
            };
          });
        });

        _maps[mapName] = { ..._maps[mapName], tiles: newTiles };
      });

      return { ...state, storyMaps: _maps };

    case 'ADD_RANDOM_MAP':
      const _randomMaps = _cloneDeep(state.randomMaps);

      _randomMaps.push({
        tiles: action.payload.tiles,
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
