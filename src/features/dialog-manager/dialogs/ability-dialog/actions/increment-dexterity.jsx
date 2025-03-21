export default function incrementDexterity() {
    return dispatch => {
        dispatch({
            type: 'INCREMENT_DEXTERITY',
        });
    };
}
