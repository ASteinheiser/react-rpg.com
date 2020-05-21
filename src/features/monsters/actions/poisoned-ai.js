import moveNormally from './normal-ai';
import { calculateDamage } from '../../../utils/dice';
import {
    TURNS_FOR_POISON,
    POISON_DAMAGE,
    SPRITE_SIZE,
} from '../../../config/constants';

export default function poisoned(sightBox, currentMap, monster) {
    return (dispatch, getState) => {
        const { stats } = getState();

        dispatch(moveNormally(sightBox, currentMap, monster));

        let dead = false;

        if (monster.aiTurns % TURNS_FOR_POISON === TURNS_FOR_POISON - 1) {
            const damage = calculateDamage(POISON_DAMAGE);

            dispatch({
                type: 'DAMAGE_TO_MONSTER',
                payload: {
                    damage,
                    id: monster.id,
                    map: currentMap,
                    entity: monster.type,
                    from: 'poison',
                },
            });

            if (monster.hp - damage <= 0) {
                dead = true;
                // and get some exp
                dispatch({
                    type: 'GET_EXP',
                    payload: monster.exp,
                });

                if (stats.exp + monster.exp >= stats.expToLevel) {
                    dispatch({
                        type: 'PAUSE',
                        payload: {
                            pause: true,
                            levelUp: true,
                        },
                    });
                }
                // play death sound
                dispatch({
                    type: 'MONSTER_DIED',
                    payload: monster.type,
                });

                // replace monster will blood spill
                // need to pass relative tile index
                dispatch({
                    type: 'ADD_BLOOD_SPILL',
                    payload: {
                        x: monster.position[0] / SPRITE_SIZE,
                        y: monster.position[1] / SPRITE_SIZE,
                    },
                });
            }
        }

        if (!dead && monster.aiTurns === 0) {
            dispatch({
                type: 'CHANGE_AI',
                payload: {
                    map: currentMap,
                    ai: monster.originalAI,
                    id: monster.id,
                    from: 'poisoned',
                    turns: 0,
                    entity: monster.type,
                    original: monster.originalAI,
                },
            });
        }
    };
}
