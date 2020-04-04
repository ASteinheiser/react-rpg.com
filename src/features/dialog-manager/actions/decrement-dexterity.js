export default function decrementDexterity() {
    return dispatch => {
        dispatch({
            type: 'DECREMENT_DEXTERITY',
        });
    };
}
