import { LEVEL_UP_ABILITY_POINTS } from '../../../config/constants';

export default function abilityScoreDialog() {
    return (dispatch, getState) => {
        const { abilities } = getState().stats;
        abilities.points = LEVEL_UP_ABILITY_POINTS;

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
                fromLevelUp: true,
            },
        });
    };
}
