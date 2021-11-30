export default function incrementIntelligence() {
    return dispatch => {
        dispatch({
            type: 'INCREMENT_INTELLIGENCE',
        });
    };
}
