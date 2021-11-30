export default function backToCharacterCreation() {
    return dispatch => {
        dispatch({
            type: 'PAUSE',
            payload: {
                pause: true,
                characterCreation: true,
            },
        });
    };
}
