export default function incrementConstitution() {
    return dispatch => {
        dispatch({
            type: 'INCREMENT_CONSTITUTION',
        });
    };
}
