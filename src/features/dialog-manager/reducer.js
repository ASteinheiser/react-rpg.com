
const initialState = {
  gameText: false,
  gameOver: false,
  gameStart: true,
  gameInstructions: false,
  gameSelect: null,
  gameWin: false,
  paused: true,
  chest: false,
  chestOpen: false,
  shop: false,
  settings: false,
  inventory: false,
  levelUp: false
};

const dialogManagerReducer = (state = initialState, { type, payload }) => {

  switch(type) {

    case 'PAUSE':
      const { shop, chest, gameStart, inventory, gameOver, gameText, gameWin, gameSelect, gameInstructions, levelUp, pause } = payload;

      return {
        ...state,
        levelUp: levelUp || false,
        shop: shop || false,
        chest: chest || false,
        gameStart: gameStart || false,
        inventory: inventory || false,
        gameOver: gameOver || false,
        gameText: gameText || false,
        gameWin: gameWin || false,
        gameSelect: gameSelect || null,
        gameInstructions: gameInstructions || false,
        paused: pause
      };

    case 'SET_CHEST_DATA':
      return { ...state, chestOpen: payload };

    case 'OPEN_SETTINGS':
      return { ...state, settings: true };

    case 'CLOSE_SETTINGS':
      return { ...state, settings: false };

    case 'SET_STORY_MAP':
      const { direction, currentMap, storyMaps } = payload;

      const { stairs } = storyMaps[currentMap];

      const nextMap = stairs[direction];

      const { message } = storyMaps[nextMap];
      // if the map has a message and player is going up, display message
      if(message && direction === 'up') {
        return {
          ...state,
          paused: true,
          gameText: {
            title: message.title,
            body: message.body
          }
        };
      }

      return state;

    case 'RESET':
      return initialState;

    default:
      return state;
  }
};

export default dialogManagerReducer;