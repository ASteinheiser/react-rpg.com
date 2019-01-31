import maps from '../../data/maps';

const initialState = {
  currentMap: null,
  gameText: false,
  gameOver: false,
  gameStart: true,
  gameInstructions: false,
  gameSelect: null,
  gameMode: null,
  gameWin: false,
  paused: true,
  chest: false,
  shop: false,
  settings: false,
  inventory: false,
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

    // set the paused prop to the dialog component
    case 'PAUSE':
      // check if pause type is shop
      newState.shop = action.payload.shop || false;
      // check if pause type is chest
      newState.chest = action.payload.chest || false;
      // check if pause type is game start
      newState.gameStart = action.payload.gameStart || false;
      // check if pause type is inventory
      newState.inventory = action.payload.inventory || false;
      // check if pause type is game over
      newState.gameOver = action.payload.gameOver || false;
      // check if pause type is game text
      newState.gameText = action.payload.gameText || false;
      // check if pause type is game win
      newState.gameWin = action.payload.gameWin || false;
      // check if pause type is for game select
      newState.gameSelect = action.payload.gameSelect || null;
      // check if pause type is for game instructions
      newState.gameInstructions = action.payload.gameInstructions || false;
      // check if pausing or unpausing
      newState.paused = action.payload.pause;

      return newState;

    case 'OPEN_SETTINGS':
      newState.settings = true;
      return newState;

    case 'CLOSE_SETTINGS':
      newState.settings = false;
      return newState;

    case 'LOAD_NEXT_MAP':
      const { direction } = action.payload;
      const { currentMap } = newState;

      let { stairs } = maps[currentMap];

      newState.currentMap = stairs[direction];

      const { message } = maps[newState.currentMap];
      // if the map has a message and player is going up, display message
      if(message && direction === 'up') {
        newState.paused = true;
        newState.gameText = {
          title: message.title,
          body: message.body
        };
      }

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
