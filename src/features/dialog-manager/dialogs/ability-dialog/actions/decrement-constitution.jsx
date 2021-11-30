export default function decrementConstitution() {
    return dispatch => {
        dispatch({
            type: 'DECREMENT_CONSTITUTION',
        });
    };
}
