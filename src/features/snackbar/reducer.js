const initialState = {
    notEnoughGold: '',
    tooManyItems: '',
    itemDropped: '',
    itemUsed: '',
    itemReceived: '',
    item: null,
    errorMessage: '',
    itemSold: '',
};

const snackbarReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case 'NOTIFY_PLAYER':
            return {
                ...state,
                message: `${payload}-${new Date().getTime()}`,
            };

        case 'NOT_ENOUGH_GOLD':
            return {
                ...state,
                notEnoughGold: `${payload.name}-${new Date().getTime()}`,
                item: payload,
            };

        case 'TOO_MANY_ITEMS':
            return {
                ...state,
                tooManyItems: `${payload.name}-${new Date().getTime()}`,
                item: payload,
            };

        case 'GET_ITEM':
            return {
                ...state,
                itemReceived: `${payload.name}-${new Date().getTime()}`,
                item: payload,
            };

        case 'SELL_ITEM':
            return {
                ...state,
                itemSold: `${payload.name}-${new Date().getTime()}`,
                item: payload,
            };

        case 'DROP_ITEM':
            return {
                ...state,
                itemDropped: `${payload.name}-${new Date().getTime()}`,
                item: payload,
            };

        case 'USE_ITEM':
            return {
                ...state,
                itemUsed: `${payload.name}-${new Date().getTime()}`,
                item: payload,
            };

        case 'CLEAR_NOTIFICATION':
        case 'RESET':
            return initialState;

        case 'LOAD_DATA':
            return { ...initialState, ...payload.snackbar };

        default:
            return state;
    }
};

export default snackbarReducer;
