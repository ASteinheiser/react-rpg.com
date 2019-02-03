
const initialState = {
  optOutDownload: false
};

const appStateReducer = (state = initialState, action) => {

  let newState = Object.assign({}, state);

  switch(action.type) {

    case 'OPT_OUT_DOWNLOAD':
      newState.optOutDownload = true;
      return newState;

    default:
      return state;
  }
};

export default appStateReducer;