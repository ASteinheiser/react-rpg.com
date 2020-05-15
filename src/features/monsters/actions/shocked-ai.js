import { calculateDamage } from '../../../utils/dice';
import { SHOCK_DAMAGE, SPRITE_SIZE } from '../../../config/constants';

export default function shocked(sightBox, currentMap, monster) {
    return (dispatch, getState) => {
        const { stats } = getState();

        let dead = false;
        const damage = calculateDamage(SHOCK_DAMAGE);

        dispatch({
            type: 'DAMAGE_TO_MONSTER',
            payload: {
                damage,
                id: monster.id,
                map: currentMap,
                entity: monster.type,
                from: 'shock',
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

        if (!dead && monster.aiTurns === 0) {
            dispatch({
                type: 'CHANGE_AI',
                payload: {
                    map: currentMap,
                    ai: 'normal',
                    id: monster.id,
                    from: 'shocked',
                    turns: 0,
                    entity: monster.type,
                },
            });
        }
    };
}
