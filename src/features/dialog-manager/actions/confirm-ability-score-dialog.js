export default function confirmAbilityScoreDialog() {
    return (dispatch, getState) => {
        const { abilities } = getState().dialog;

        dispatch({
            type: 'SET_ABILITY_SCORES',
            payload: {
                abilities: {
                    ...abilities,
                },
            },
        });

        if (getState().dialog.fromLevelUp) {
            dispatch({
                type: 'PAUSE',
                payload: {
                    pause: false,
                    fromLevelUp: false,
                },
            });
        } else if (getState().dialog.playerOpenedAbilityDialog) {
            dispatch({
                type: 'PAUSE',
                payload: {
                    pause: false,
                    playerOpenedAbilityDialog: false,
                },
            });
        } else {
            dispatch({
                type: 'PAUSE',
                payload: {
                    pause: true,
                    gameInstructions: true,
                },
            });
        }
    };
}
