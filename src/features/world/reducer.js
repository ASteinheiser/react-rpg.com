import maps from '../../data/maps';

const initialState = {
  currentMap: null,
  gameMode: null,
  turn: 0,
  sound: true,
  randomMaps: [],
  floorNum: null
};

const worldReducer = (state = initialState, action) => {

  let newState = Object.assign({}, state);

  switch(action.type) {

    case 'ADD_RANDOM_MAP':
      newState.randomMaps.push({
        tiles: action.payload.tiles,
        id: action.payload.id
      });
      return newState;

    case 'SET_SOUND':
      // turn on or off game sounds
      newState.sound = action.payload.sound;
      return newState;

    case 'TAKE_TURN':
      // increment the turn
      newState.turn += 1
      return newState;

    case 'LOAD_NEXT_MAP':
      const { direction, currentMap } = action.payload;

      const { stairs } = maps[currentMap];

      newState.currentMap = stairs[direction];

      return newState;

    case 'SET_CURR_MAP':
      newState.currentMap = action.payload.map;
      newState.floorNum = action.payload.floorNum;

      return newState;

    case 'SET_START_MAP':
      const { startMap, gameMode, floorNum } = action.payload;

      newState.currentMap = startMap;
      newState.gameMode = gameMode;
      if(floorNum) newState.floorNum = floorNum;

      return newState;

    case 'RESET':
      return {
        ...initialState,
        sound: state.sound,
        randomMaps: [],
        floorNum: null
      };

    default:
      return state;
  }
};

export default worldReducer;
