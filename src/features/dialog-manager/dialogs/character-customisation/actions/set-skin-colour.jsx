export default function setSkinColour(colour) {
    return dispatch => {
        dispatch({
            type: 'SET_SKIN_COLOUR',
            payload: colour,
        });
    };
}
