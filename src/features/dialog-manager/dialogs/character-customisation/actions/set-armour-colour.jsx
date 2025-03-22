export default function setArmourColour(colour) {
    return dispatch => {
        dispatch({
            type: 'SET_ARMOUR_COLOUR',
            payload: colour,
        });
    };
}
