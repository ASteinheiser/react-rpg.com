export default function setRace(characterRace) {
    return dispatch => {
        dispatch({
            type: 'SET_RACE',
            payload: { characterRace: characterRace },
        });
    };
}
