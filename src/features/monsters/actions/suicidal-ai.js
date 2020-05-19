import { playerInRange, getRandomDirection } from './move-monster';
import { move } from './normal-ai';
import { calculateDamage } from '../../../utils/dice';
import { SPRITE_SIZE } from '../../../config/constants';

export default function suicidal(sightBox, currentMap, monster) {
    return (dispatch, getState) => {
        const { stats } = getState();
        const { id, position, dice, type } = monster;

        const monsterPosition = position.map(pos => pos / SPRITE_SIZE);

        let monsterVisible = false;
        // look through each current sight box tile
        sightBox.forEach(tile => {
            // if the monster is in sight
            if (JSON.stringify(tile) === JSON.stringify(monsterPosition)) {
                monsterVisible = true;
            }
        });

        if (monsterVisible) {
            dispatch({
                type: 'REVEAL_MONSTER',
                payload: { id, map: currentMap },
            });

            const { player } = getState();
            // check if player is in range
            if (playerInRange(player.position, monsterPosition)) {
                const calculatedMonsterDamage = calculateDamage(dice);
                dispatch({
                    type: 'DAMAGE_TO_PLAYER',
                    payload: {
                        damage: calculatedMonsterDamage,
                        entity: type,
                        kind: 'suicide',
                    },
                });

                // check if player died
                if (stats.hp - calculatedMonsterDamage <= 0) {
                    // play death sound
                    dispatch({
                        type: 'PLAYER_DIED',
                        payload: null,
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
                // deal damage to monster
                dispatch({
                    type: 'DAMAGE_TO_MONSTER',
                    payload: {
                        damage: monster.hp,
                        id: monster.id,
                        map: currentMap,
                        entity: monster.type,
                        from: 'suicide',
                    },
                });

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
                        x: position[0] / SPRITE_SIZE,
                        y: position[1] / SPRITE_SIZE,
                    },
                });
            } else {
                // no player in range, time to move!
                // get the monsters actual position in pixels
                const position = monsterPosition.map(
                    value => value * SPRITE_SIZE
                );
                // get distance from player on both axis
                const xDiff = position[0] - player.position[0];
                const yDiff = position[1] - player.position[1];
                const greaterY = Math.abs(yDiff) > Math.abs(xDiff);
                // see if y axis is greater distance from player
                if (greaterY) {
                    // if the monster is mostly below the player on the y axis
                    if (yDiff > 0) {
                        // move the monster 'up' relatively
                        dispatch(
                            move(
                                'up',
                                position,
                                currentMap,
                                id,
                                0,
                                xDiff >= 0 ? 'left' : 'right'
                            )
                        );
                    }
                    // if the monster is mostly above the player on the y axis
                    else if (yDiff < 0) {
                        // move the monster 'down' relatively
                        dispatch(
                            move(
                                'down',
                                position,
                                currentMap,
                                id,
                                0,
                                xDiff >= 0 ? 'left' : 'right'
                            )
                        );
                    }
                } // x axis is greater distance from player
                else {
                    // if the monster is mostly to the right of the player
                    if (xDiff > 0) {
                        // move the monster 'left' relatively
                        dispatch(
                            move(
                                'left',
                                position,
                                currentMap,
                                id,
                                0,
                                yDiff >= 0 ? 'up' : 'down'
                            )
                        );
                    }
                    // if the monster is mostly to the left of the player
                    else if (xDiff < 0) {
                        // move the monster 'right' relatively
                        dispatch(
                            move(
                                'right',
                                position,
                                currentMap,
                                id,
                                0,
                                yDiff >= 0 ? 'up' : 'down'
                            )
                        );
                    }
                }
            }
        } else {
            // monster is too far away from the player
            dispatch({
                type: 'HIDE_MONSTER',
                payload: { id, map: currentMap },
            });
            // give a 25% chance to move the monster when hidden
            if (Math.round(Math.random() * (4 - 1) + 1) !== 4) {
                const randomDirection = getRandomDirection();
                // move the monster in a random direction
                dispatch(move(randomDirection, position, currentMap, id, 0));
            }
        }
    };
}
