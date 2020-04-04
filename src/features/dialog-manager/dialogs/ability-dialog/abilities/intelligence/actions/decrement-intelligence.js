export default function decrementIntelligence() {
    return dispatch => {
        dispatch({
            type: 'DECREMENT_INTELLIGENCE',
        });
    };
}
