
const initialState = {
  optOutDownload: false,
  largeView: false,
  sideMenu: false
};

const appStateReducer = (state = initialState, action) => {

  let newState = Object.assign({}, state);

  switch(action.type) {

    case 'OPT_OUT_DOWNLOAD':
      newState.optOutDownload = true;
      return newState;

    case 'SET_LARGE_VIEW':
      newState.largeView = action.payload.value;
      return newState;

    case 'SET_SIDE_MENU':
      newState.sideMenu = action.payload.value;
      return newState;

    default:
      return state;
  }
};

export default appStateReducer;