export default function toggleJournal() {
    return (dispatch, getState) => {
        const { dialog, appState } = getState();
        const { journalSideMenu } = appState;
        const { inventory, journalDialog } = dialog;

        if (journalSideMenu) {
            dispatch({
                type: 'PAUSE',
                payload: {
                    pause: inventory,
                    journalDialog: !journalDialog,
                    inventory,
                },
            });
        } else if (journalDialog) {
            dispatch({
                type: 'PAUSE',
                payload: { pause: inventory, inventory },
            });
        } else if (!journalSideMenu) {
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
