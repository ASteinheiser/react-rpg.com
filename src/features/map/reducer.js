
const initialState = {
  sightBox: [],
  paddingSightBox: []
};

const mapReducer = (state = initialState, { type, payload }) => {

  switch(type) {

    case 'EXPLORE_TILES':
      const { tiles, paddingTiles } = payload;

      return {
        sightBox: tiles,
        paddingSightBox: paddingTiles
      };

    case 'RESET':
      return initialState;

    default:
      return state;
  }
};

export default mapReducer;
