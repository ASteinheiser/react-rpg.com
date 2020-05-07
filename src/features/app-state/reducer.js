const initialState = {
    optOutDownload: false,
    largeView: false,
    sideMenu: false,
    journalSideMenu: false,
};

const appStateReducer = (state = initialState, { payload, type }) => {
    switch (type) {
        case 'OPT_OUT_DOWNLOAD':
            return { ...state, optOutDownload: true };

        case 'SET_LARGE_VIEW':
            return { ...state, largeView: payload };

        case 'SET_SIDE_MENU':
            return { ...state, sideMenu: payload };

        case 'SET_SHOW_JOURNAL':
            return { ...state, journalSideMenu: payload };

        case 'LOAD_DATA':
            return { ...initialState, ...payload.appState };

        default:
            return state;
    }
};

export default appStateReducer;
