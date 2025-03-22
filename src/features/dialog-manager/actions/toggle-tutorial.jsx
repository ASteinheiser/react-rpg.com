export default function toggleTutorial() {
    return (dispatch, getState) => {
        if (getState().dialog.gameRunning) {
            if (getState().dialog.tutorialDialog) {
                dispatch({
                    type: 'PAUSE',
                    gameRunning: true,
                    payload: { pause: false },
                });
            } else {
                dispatch({
                    type: 'PAUSE',
                    payload: {
                        pause: true,
                        gameRunning: true,
                        tutorialDialog: true,
                        tutorialPage: getState().dialog.tutorialPage,
                    },
                });
            }
        } else {
            if (getState().dialog.tutorialDialog) {
                dispatch({
                    type: 'PAUSE',
                    payload: {
                        pause: true,
                        gameStart: true,
                        gameSelect: getState().dialog.gameType,
                        gameRunning: false,
                    },
                });
            } else {
                dispatch({
                    type: 'PAUSE',
                    payload: {
                        pause: true,
                        gameRunning: false,
                        tutorialDialog: true,
                        tutorialPage: getState().dialog.tutorialPage,
                    },
                });
            }
        }
    };
}
