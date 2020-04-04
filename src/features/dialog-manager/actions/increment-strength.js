export default function incrementStrength() {
    return dispatch => {
        dispatch({
            type: 'INCREMENT_STRENGTH',
        });
    };
}
