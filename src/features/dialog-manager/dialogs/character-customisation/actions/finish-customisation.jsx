export default function finishCustomisation() {
    return (dispatch, getState) => {
        const {
            hairColour,
            eyeColour,
            skinColour,
            armourColour,
            clothesColour,
        } = getState().dialog.appearance;

        dispatch({
            type: 'SET_PLAYER_APPEARANCE',
            payload: {
                hairColour,
                eyeColour,
                skinColour,
                armourColour,
                clothesColour,
            },
        });

        dispatch({
            type: 'PAUSE',
            payload: {
                pause: true,
                abilityDialog: true,
            },
        });
    };
}
