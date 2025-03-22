import {
    observeImpassable,
    checkForOtherMonster,
    playerInRange,
    getRandomDirection,
} from './move-monster';
import attackPlayer from './attack-player';
import { SPRITE_SIZE } from '../../../config/constants';

// recursive function for moving the monster to the next available tile
// will try to go towards the player if possible
export function move(
    direction,
    position,
    currentMap,
    id,
    count,
    preference = false
) {
    return (dispatch, getState) => {
        count++;
        // dont allow for infinite loops when monster can't move
        if (count >= 5) return;

        let nextPos = [0, 0];

        switch (direction) {
            case 'up':
                nextPos = [position[0], position[1] - SPRITE_SIZE];
                // see if the monster can move to the next location
                if (dispatch(observeImpassable(nextPos))) {
                    // if we found a monster
                    if (
                        dispatch(checkForOtherMonster(id, nextPos, currentMap))
                    ) {
                        // move in a circle, but the opposite direction
                        return dispatch(
                            move(
                                preference ? preference : 'left',
                                position,
                                currentMap,
                                id,
                                count
                            )
                        );
                    } else {
                        // otherwise just move to the next spot
                        position[1] -= SPRITE_SIZE;
                    }
                    break;
                } else {
                    // otherwise move them to another spot
                    return dispatch(
                        move(
                            preference ? preference : 'right',
                            position,
                            currentMap,
                            id,
                            count
                        )
                    );
                }
            case 'down':
                nextPos = [position[0], position[1] + SPRITE_SIZE];
                // see if the monster can move to the next location
                if (dispatch(observeImpassable(nextPos))) {
                    // if we found a monster
                    if (
                        dispatch(checkForOtherMonster(id, nextPos, currentMap))
                    ) {
                        // move in a circle, but the opposite direction
                        return dispatch(
                            move(
                                preference ? preference : 'right',
                                position,
                                currentMap,
                                id,
                                count
                            )
                        );
                    } else {
                        // otherwise just move to the next spot
                        position[1] += SPRITE_SIZE;
                    }
                    break;
                } else {
                    // otherwise move them to another spot
                    return dispatch(
                        move(
                            preference ? preference : 'left',
                            position,
                            currentMap,
                            id,
                            count
                        )
                    );
                }
            case 'left':
                nextPos = [position[0] - SPRITE_SIZE, position[1]];
                // see if the monster can move to the next location
                if (dispatch(observeImpassable(nextPos))) {
                    // if we found a monster
                    if (
                        dispatch(checkForOtherMonster(id, nextPos, currentMap))
                    ) {
                        // move in a circle, but the opposite direction
                        return dispatch(
                            move(
                                preference ? preference : 'down',
                                position,
                                currentMap,
                                id,
                                count
                            )
                        );
                    } else {
                        // otherwise just move to the next spot
                        position[0] -= SPRITE_SIZE;
                    }
                    break;
                } else {
                    // otherwise move them to another spot
                    return dispatch(
                        move(
                            preference ? preference : 'up',
                            position,
                            currentMap,
                            id,
                            count
                        )
                    );
                }
            case 'right':
                nextPos = [position[0] + SPRITE_SIZE, position[1]];
                // see if the monster can move to the next location
                if (dispatch(observeImpassable(nextPos))) {
                    // if we found a monster
                    if (
                        dispatch(checkForOtherMonster(id, nextPos, currentMap))
                    ) {
                        // move in a circle, but the opposite direction
                        return dispatch(
                            move(
                                preference ? preference : 'up',
                                position,
                                currentMap,
                                id,
                                count
                            )
                        );
                    } else {
                        // otherwise just move to the next spot
                        position[0] += SPRITE_SIZE;
                    }
                    break;
                } else {
                    // otherwise move them to another spot
                    return dispatch(
                        move(
                            preference ? preference : 'down',
                            position,
                            currentMap,
                            id,
                            count
                        )
                    );
                }
            default:
        }

        // recalculate if the monster is in sight
        const { sightBox } = getState().map;
        let inSight = false;
        // look through each current sight box tile
        sightBox.forEach(tile => {
            // if the monster is in sight
            const newMonsterPos = position.map(value => value / SPRITE_SIZE);
            if (JSON.stringify(tile) === JSON.stringify(newMonsterPos)) {
                inSight = true;
            }
        });
        // if the monster is now in sight
        if (inSight) {
            dispatch({
                type: 'REVEAL_MONSTER',
                payload: { id, map: currentMap },
            });
        } else {
            // if the monster is now out of sight
            dispatch({
                type: 'HIDE_MONSTER',
                payload: { id, map: currentMap },
            });
        }
        const monster = getState().monsters.components[currentMap][id];
        // move the monster
        dispatch({
            type: 'MOVE_MONSTER',
            payload: {
                map: currentMap,
                id,
                position,
                direction:
                    direction === 'up' || direction === 'down'
                        ? monster.direction
                        : direction === 'left'
                        ? 'WEST'
                        : 'EAST',
            },
        });
    };
}

export default function moveNormally(sightBox, currentMap, monster) {
    return (dispatch, getState) => {
        const { id, position } = monster;

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
                dispatch(attackPlayer(monster));
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
