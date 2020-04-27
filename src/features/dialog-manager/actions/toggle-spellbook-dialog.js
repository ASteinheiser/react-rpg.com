export default function toggleSpellbookDialog() {
    return (dispatch, getState) => {
        dispatch({
            type: 'PAUSE',
            payload: {
                pause: !getState().dialog.paused,
                spellbookDialog: !getState().dialog.spellbookDialog,
            },
        });
    };
}
