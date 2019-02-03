
const initialState = {
  gameText: false,
  gameOver: false,
  gameStart: true,
  gameInstructions: false,
  gameSelect: null,
  gameWin: false,
  paused: true,
  chest: false,
  shop: false,
  settings: false,
  inventory: false
};

const dialogManagerReducer = (state = initialState, action) => {

  let newState = Object.assign({}, state);

  switch(action.type) {

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

    case 'RESET':
      return initialState;

    default:
      return state;
  }
}

export default dialogManagerReducer;