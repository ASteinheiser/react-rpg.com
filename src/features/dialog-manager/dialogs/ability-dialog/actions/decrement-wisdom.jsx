export default function decrementWisdom() {
    return dispatch => {
        dispatch({
            type: 'DECREMENT_WISDOM',
        });
    };
}
