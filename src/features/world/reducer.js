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
      return { ...state, storyMaps: _cloneDeep(maps) };

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
