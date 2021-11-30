import { LEVEL_UP_ABILITY_POINTS } from '../../../config/constants';

/**
 * Open the abilitiy score dialog
 *
 * @param {*} fromLevelUp Whether this was called after the level up dialog
 */
export default function abilityScoreDialog(fromLevelUp) {
    return (dispatch, getState) => {
        const { abilities } = getState().stats;

        if (fromLevelUp) {
            // They just levelled up and have been allocated some points to use
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
