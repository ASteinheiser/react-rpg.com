export default function backToCharacterCustomisation() {
    return dispatch => {
        dispatch({
            type: 'PAUSE',
            payload: {
                pause: true,
                characterCustomisation: true,
            },
        });
    };
}
