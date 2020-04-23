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
                hairColour: hairColour,
                eyeColour: eyeColour,
                skinColour: skinColour,
                armourColour: armourColour,
                clothesColour: clothesColour,
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
