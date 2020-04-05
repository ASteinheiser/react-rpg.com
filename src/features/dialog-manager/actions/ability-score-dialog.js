export default function abilityScoreDialog() {
    return dispatch => {
        dispatch({
            type: 'PAUSE',
            payload: {
                pause: true,
                abilityDialog: true,
            },
        });
    };
}
