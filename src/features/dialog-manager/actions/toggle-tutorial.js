export default function toggleTutorial() {
    return (dispatch, getState) => {
        if (getState().dialog.tutorialDialog) {
            dispatch({
                type: 'PAUSE',
                payload: { pause: false },
            });
        } else {
            dispatch({
                type: 'PAUSE',
                payload: {
                    pause: true,
                    tutorialDialog: true,
                    tutorialPage: getState().dialog.tutorialPage,
                },
            });
        }
    };
}
