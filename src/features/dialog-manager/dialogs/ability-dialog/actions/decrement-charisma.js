export default function decrementCharisma() {
    return dispatch => {
        dispatch({
            type: 'DECREMENT_CHARISMA',
        });
    };
}
