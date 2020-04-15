export default function setClass(characterClass) {
    return dispatch => {
        dispatch({
            type: 'SET_CLASS',
            payload: { characterClass: characterClass },
        });
    };
}
