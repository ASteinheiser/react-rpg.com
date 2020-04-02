export default function closeChestDialog() {
    return dispatch => {
        dispatch({
            type: 'PAUSE',
            payload: { pause: false },
        });
    };
}
