import { calculateDamage } from '../../../utils/dice';
import { SPRITE_SIZE } from '../../../config/constants';

export default function attackPlayer(monster) {
    return (dispatch, getState) => {
        const { stats, player } = getState();
        const { attackValue, dice, type, projectile, position } = monster;

        const attack = calculateDamage(attackValue);

        const calculatedMonsterDamage =
            attack >= Math.max(stats.defence, 0) ? calculateDamage(dice) : 0;

        if (projectile) {
            let direction = '';
            const targetPosition = [
                position[0] - player.position[0],
                position[1] - player.position[1],
            ];

            if (player.position[0] !== position[0]) {
                if (player.position[0] < position[0]) {
                    direction = 'WEST';
                    targetPosition[0] -= SPRITE_SIZE;
                } else {
                    direction = 'EAST';
                    targetPosition[0] += SPRITE_SIZE;
                }
            } else if (player.position[1] !== position[1]) {
                if (player.position[1] < position[1]) {
                    direction = 'NORTH';
                    targetPosition[1] -= SPRITE_SIZE;
                } else {
                    direction = 'SOUTH';
                    targetPosition[1] += SPRITE_SIZE;
                }
            }
            dispatch({
                type: 'MONSTER_USE_PROJECTILE',
                payload: {
                    position: targetPosition,
                    projectile,
                    direction,
                    entity: type,
                },
            });
        }

        dispatch({
            type: 'MONSTER_ABILITY_CHECK',
            payload: {
                attackValue: attack,
                check: Math.max(stats.defence, 0),
                against: 'defence',
                entity: type,
                defender: 'player',
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
            type: 'DAMAGE_TO_PLAYER',
            payload: { damage: calculatedMonsterDamage, entity: type },
        });

        // check if player died
        if (stats.hp - calculatedMonsterDamage <= 0) {
            // play death sound
            dispatch({
                type: 'PLAYER_DIED',
                payload: { entity: type },
            });
            // if it did, game over
            dispatch({
                type: 'PAUSE',
                payload: {
                    gameOver: true,
                    pause: true,
                },
            });
        }
    };
}
