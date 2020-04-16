export default function clearNotification() {
    return dispatch => {
        dispatch({
            type: 'CLEAR_NOTIFICATION',
            payload: null,
        });
    };
}
