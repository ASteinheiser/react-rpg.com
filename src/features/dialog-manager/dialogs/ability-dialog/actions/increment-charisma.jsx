export default function incrementCharisma() {
    return dispatch => {
        dispatch({
            type: 'INCREMENT_CHARISMA',
        });
    };
}
