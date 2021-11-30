const initialState = {
    sightBox: [],
    paddingSightBox: [],
};

const mapReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case 'EXPLORE_TILES':
            const { tiles, paddingTiles } = payload;

            return {
                sightBox: tiles,
                paddingSightBox: paddingTiles,
            };

        case 'RESET':
            return initialState;

        case 'LOAD_DATA':
            return { ...initialState, ...payload.map };

        default:
            return state;
    }
};

export default mapReducer;
