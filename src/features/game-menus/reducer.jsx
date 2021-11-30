const initialState = {
    sound: true,
};

const mapReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case 'SET_SOUND':
            // turn on or off game sounds
            return { ...state, sound: payload };

        case 'LOAD_DATA':
            return { ...initialState, ...payload.gameMenu };

        default:
            return state;
    }
};

export default mapReducer;
