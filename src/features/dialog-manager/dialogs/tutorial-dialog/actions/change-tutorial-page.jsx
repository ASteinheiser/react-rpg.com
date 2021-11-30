export default function changeTutorialPage(page) {
    return dispatch => {
        dispatch({
            type: 'CHANGE_TUTORIAL_PAGE',
            payload: {
                tutorialPage: page,
            },
        });
    };
}
