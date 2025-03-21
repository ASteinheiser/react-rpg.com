export default function decrementStrength() {
    return dispatch => {
        dispatch({
            type: 'DECREMENT_STRENGTH',
        });
    };
}
