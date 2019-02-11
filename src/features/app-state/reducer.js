
const initialState = {
  optOutDownload: false,
  largeView: false,
  sideMenu: false
};

const appStateReducer = (state = initialState, action) => {

  switch(action.type) {

    case 'OPT_OUT_DOWNLOAD':
      return { ...state, optOutDownload: true };

    case 'SET_LARGE_VIEW':
      return { ...state, largeView: action.payload.value };

    case 'SET_SIDE_MENU':
      return { ...state, sideMenu: action.payload.value };

    default:
      return state;
  }
};

export default appStateReducer;