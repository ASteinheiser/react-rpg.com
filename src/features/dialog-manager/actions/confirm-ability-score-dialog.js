import loadStartingItems from '../../inventory/actions/load-starting-items';
import showFirstStoryMessage from './show-first-story-message';
import showEndlessMessage from './show-endless-message';

export default function confirmAbilityScoreDialog() {
    return (dispatch, getState) => {
        const {
            abilities,
            fromLevelUp,
            playerOpenedAbilityDialog,
            gameType,
        } = getState().dialog;

        dispatch({
            type: 'SET_ABILITY_SCORES',
            payload: {
                abilities: {
                    ...abilities,
                },
            },
        });

        if (fromLevelUp) {
            dispatch({
                type: 'PAUSE',
                payload: {
                    pause: false,
                    fromLevelUp: false,
                },
            });
        } else if (playerOpenedAbilityDialog) {
            dispatch({
                type: 'PAUSE',
                payload: {
                    pause: false,
                    playerOpenedAbilityDialog: false,
                },
            });
        } else {
            dispatch(loadStartingItems());
            if (gameType === 'endless') {
                dispatch(showEndlessMessage());
            } else {
                dispatch(showFirstStoryMessage());
            }
        }
    };
}
