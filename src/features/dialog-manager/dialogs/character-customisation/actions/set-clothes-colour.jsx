export default function setClothesColour(colour) {
    return dispatch => {
        dispatch({
            type: 'SET_CLOTHES_COLOUR',
            payload: colour,
        });
    };
}
