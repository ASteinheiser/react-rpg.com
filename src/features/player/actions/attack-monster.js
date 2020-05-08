import {
    checkForMonster,
    getNewPosition,
    observeBoundaries,
} from './move-player';
import { calculateDamage, d20 } from '../../../utils/dice';
import calculateModifier from '../../../utils/calculate-modifier';
import getNextTile from '../../../utils/get-next-tile';
import { SPRITE_SIZE, UNARMED_DAMAGE } from '../../../config/constants';

export const findTarget = (position, direction, range) => {
    return dispatch => {
        let targetPosition = null;
        switch (direction) {
            case 'NORTH':
                for (
                    let y = position[1];
                    y >= position[1] - range;
                    y -= SPRITE_SIZE
                ) {
                    const pos = getNewPosition([position[0], y], direction);
                    targetPosition = pos;
                    if (dispatch(checkForMonster(pos))) {
                        break;
                    }
                }
                break;
            case 'SOUTH':
                for (
                    let y = position[1];
                    y <= position[1] + range;
                    y += SPRITE_SIZE
                ) {
                    const pos = getNewPosition([position[0], y], direction);
                    targetPosition = pos;
                    if (dispatch(checkForMonster(pos))) {
                        break;
                    }
                }
                break;
            case 'EAST':
                for (
                    let x = position[0];
                    x <= position[0] + range;
                    x += SPRITE_SIZE
                ) {
                    const pos = getNewPosition([x, position[1]], direction);
                    targetPosition = pos;
                    if (dispatch(checkForMonster(pos))) {
                        break;
                    }
                }
                break;
            case 'WEST':
                for (
                    let x = position[0];
                    x >= position[0] - range;
                    x -= SPRITE_SIZE
                ) {
                    const pos = getNewPosition([x, position[1]], direction);
                    targetPosition = pos;
                    if (dispatch(checkForMonster(pos))) {
                        break;
                    }
                }
                break;
            default:
        }

        return targetPosition;
    };
};

export default function attackMonster() {
    return (dispatch, getState) => {
        // get player direction and the location of position to attack
        const { position, direction } = getState().player;
        let newPos = getNewPosition(position, direction);

        // if the attacked tile is in bounds
        if (
            observeBoundaries(newPos) &&
            observeImpassable(newPos, getState().world)
        ) {
            const { stats, world, monsters } = getState();
            const { currentMap } = world;
            const { components } = monsters;

            const { weapon } = stats.equippedItems || {
                kind: 'melee',
                range: 1,
                damage: UNARMED_DAMAGE,
            };

            const targetPosition = dispatch(
                findTarget(position, direction, weapon.range * SPRITE_SIZE)
            );

            const monsterId = dispatch(checkForMonster(targetPosition));
            if (monsterId) {
                // If we're targetting a monster
                const currMonster = components[currentMap][monsterId];
                const monsterPos = currMonster.position;

                const ability =
                    weapon.kind === 'melee'
                        ? 'strength'
                        : weapon.kind === 'ranged'
                        ? 'dexterity'
                        : 'intelligence';

                const modifier = calculateModifier(stats.abilities[ability]);
                const attackValue = d20() + modifier;

                if (weapon.projectile) {
                    dispatch({
                        type: 'USE_PROJECTILE',
                        payload: {
                            position: targetPosition,
                            projectile: weapon.projectile,
                        },
                    });
                }

                dispatch({
                    type: 'ABILITY_CHECK',
                    payload: {
                        notation: 'd20 + ' + modifier,
                        roll: attackValue,
                        ability,
                        check: currMonster.defence,
                        entity: currMonster.type,
                        against: 'defence',
                    },
                });

                const damage =
                    attackValue >= currMonster.defence
                        ? calculateDamage(weapon.damage)
                        : 0;

                if (damage > 0) {
                    // Only show the attack animation if they hit the monster
                    dispatch({
                        type: 'PLAYER_ATTACK',
                        payload: null,
                    });
                }

                // deal damage to monster
                dispatch({
                    type: 'DAMAGE_TO_MONSTER',
                    payload: {
                        damage,
                        id: currMonster.id,
                        map: currentMap,
                        entity: currMonster.type,
                    },
                });

                // check if monster died
                if (currMonster.hp - damage <= 0) {
                    // and get some exp
                    dispatch({
                        type: 'GET_EXP',
                        payload: currMonster.exp,
                    });
                    if (stats.exp + currMonster.exp >= stats.expToLevel) {
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
                        payload: currMonster.type,
                    });
                    // replace monster will blood spill
                    // need to pass relative tile index
                    dispatch({
                        type: 'ADD_BLOOD_SPILL',
                        payload: {
                            x: monsterPos[0] / SPRITE_SIZE,
                            y: monsterPos[1] / SPRITE_SIZE,
                        },
                    });
                }

                // take a turn if the player attacked something
                dispatch({
                    type: 'TAKE_TURN',
                    payload: null,
                });
            } else {
                // Hit a wall or something else
                if (weapon.kind !== 'melee') {
                    dispatch({
                        type: 'USE_PROJECTILE',
                        payload: {
                            position: targetPosition,
                            projectile: weapon.projectile,
                        },
                    });
                }
                dispatch({
                    type: 'PLAYER_ATTACK',
                    payload: null,
                });
            }
        }
    };
}

export function observeImpassable(newPos, world) {
    const nextTile = getNextTile(world, newPos);

    return nextTile < 5;
}
