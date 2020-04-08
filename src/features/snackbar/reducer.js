const initialState = {
    notEnoughGold: '',
    tooManyItems: '',
    itemDropped: '',
    itemReceived: '',
    item: null,
};

const snackbarReducer = (state = initialState, { type, payload }) => {
    switch (type) {
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

        case 'RESET':
            return initialState;

        default:
            return state;
    }
};

export default snackbarReducer;
