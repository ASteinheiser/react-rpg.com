export default function setHairColour(colour) {
    return dispatch => {
        dispatch({
            type: 'SET_HAIR_COLOUR',
            payload: colour,
        });
    };
}
