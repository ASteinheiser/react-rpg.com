import {
    checkForMonster,
    getNewPosition,
    observeBoundaries,
} from './move-player';
import { calculateDamage, d20 } from '../../../utils/dice';
import calculateModifier from '../../../utils/calculate-modifier';
import getNextTile from '../../../utils/get-next-tile';
import { SPRITE_SIZE, UNARMED_DAMAGE } from '../../../config/constants';

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
            // if theres a monster
            const monsterId = dispatch(checkForMonster(newPos));
            if (monsterId) {
                const { stats, world, monsters } = getState();
                const { currentMap } = world;
                const { components } = monsters;

                const { weapon } = stats.equippedItems;
                // get monster
                const currMonster = components[currentMap][monsterId];
                const monsterPos = currMonster.position;

                const modifier = calculateModifier(stats.abilities.strength);
                const attackValue = d20() + modifier;

                dispatch({
                    type: 'ABILITY_CHECK',
                    payload: {
                        notation: 'd20 + ' + modifier,
                        roll: attackValue,
                        ability: 'strength',
                        check: currMonster.defence,
                    },
                });

                const damage =
                    attackValue >= currMonster.defence
                        ? calculateDamage(
                              weapon ? weapon.damage : UNARMED_DAMAGE
                          )
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
                        type: currMonster.type,
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
                        payload: null,
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
            } // no monster, just show sword swing
            else {
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
