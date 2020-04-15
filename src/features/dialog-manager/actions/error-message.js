export default function errorMessage(errorMessage) {
    return dispatch => {
        dispatch({
            type: 'ERROR_MESSAGE',
            payload: errorMessage,
        });
    };
}
