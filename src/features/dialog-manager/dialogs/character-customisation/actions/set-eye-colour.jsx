export default function setEyeColour(colour) {
    return dispatch => {
        dispatch({
            type: 'SET_EYE_COLOUR',
            payload: colour,
        });
    };
}
