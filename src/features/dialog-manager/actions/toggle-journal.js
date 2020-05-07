export default function toggleJournal() {
    return (dispatch, getState) => {
        if (getState().dialog.journalDialog) {
            dispatch({
                type: 'PAUSE',
                payload: { pause: false },
            });
        } else if (!getState().appState.journalSideMenu) {
            dispatch({
                type: 'PAUSE',
                payload: {
                    pause: true,
                    journalDialog: true,
                },
            });
        }
    };
}
