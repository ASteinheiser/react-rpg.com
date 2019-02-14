
const initialState = {
  optOutDownload: false,
  largeView: false,
  sideMenu: false
};

const appStateReducer = (state = initialState, { payload, type }) => {

  switch(type) {

    case 'OPT_OUT_DOWNLOAD':
      return { ...state, optOutDownload: true };

    case 'SET_LARGE_VIEW':
      return { ...state, largeView: payload };

    case 'SET_SIDE_MENU':
      return { ...state, sideMenu: payload };

    default:
      return state;
  }
};

export default appStateReducer;