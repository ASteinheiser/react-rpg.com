import { LEVEL_UP_ABILITY_POINTS } from '../../../config/constants';

export default function abilityScoreDialog(fromLevelUp) {
    // fromLevelUp tells us if we were called from the level up dialog or not
    return (dispatch, getState) => {
        const { abilities } = getState().stats;

        if (fromLevelUp) {
            abilities.points += LEVEL_UP_ABILITY_POINTS;
        }

        dispatch({
            type: 'LEVEL_UP_ABILITIES',
            payload: {
                abilities: abilities,
            },
        });

        dispatch({
            type: 'PAUSE',
            payload: {
                pause: true,
                abilityDialog: true,
                fromLevelUp: fromLevelUp,
                playerOpenedAbilityDialog: !fromLevelUp,
            },
        });
    };
}
