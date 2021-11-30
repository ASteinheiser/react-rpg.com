export default function incrementWisdom() {
    return dispatch => {
        dispatch({
            type: 'INCREMENT_WISDOM',
        });
    };
}
