export default function errorMessage(errorMessage) {
    return dispatch => {
        dispatch({
            type: 'NOTIFY_PLAYER',
            payload: errorMessage,
        });
    };
}
