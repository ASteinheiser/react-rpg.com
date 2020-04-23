export default function toggleJournal() {
    return (dispatch, getState) => {
        if (getState().dialog.journalDialog) {
            dispatch({
                type: 'PAUSE',
                payload: { pause: false },
            });
        } else {
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
