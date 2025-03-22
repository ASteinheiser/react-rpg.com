import { calculateDamage } from '../../../utils/dice';
import { SPRITE_SIZE } from '../../../config/constants';

export default function attackMonster(
    attackingMonster,
    defendingMonsterID,
    currentMap
) {
    return (dispatch, getState) => {
        const defender = getState().monsters.components[currentMap][
            defendingMonsterID
        ];

        const { dice, attackValue } = attackingMonster;
        const { defence, type, hp, position } = defender;

        const attack = calculateDamage(attackValue);
        const calculatedMonsterDamage =
            attack >= Math.max(defence, 0) ? calculateDamage(dice) : 0;

        dispatch({
            type: 'MONSTER_ABILITY_CHECK',
            payload: {
                attackValue: attack,
                check: Math.max(defence, 0),
                against: 'defence',
                entity: attackingMonster.type,
                defender: type,
            },
        });

        if (calculatedMonsterDamage > 0) {
            // show the attack animation and play sound
            dispatch({
                type: 'MONSTER_ATTACK',
                payload: null,
            });
        }

        dispatch({
            type: 'DAMAGE_TO_MONSTER',
            payload: {
                damage: calculatedMonsterDamage,
                id: defendingMonsterID,
                map: currentMap,
                from: attackingMonster.type,
                entity: type,
            },
        });

        // check if player died
        if (hp - calculatedMonsterDamage <= 0) {
            dispatch({
                type: 'MONSTER_DIED',
                payload: type,
            });

            // replace monster will blood spill
            // need to pass relative tile index
            dispatch({
                type: 'ADD_BLOOD_SPILL',
                payload: {
                    x: position[0] / SPRITE_SIZE,
                    y: position[1] / SPRITE_SIZE,
                },
            });
        }
    };
}
