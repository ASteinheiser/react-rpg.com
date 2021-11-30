import { playerInRange, getRandomDirection } from './move-monster';
import { move } from './normal-ai';
import attackPlayer from './attack-player';
import { SPRITE_SIZE } from '../../../config/constants';
import monsterCastSpell from './monster-cast-spell';

/**
 * An AI for monsters who have the capability of healing themselves
 *
 * @param {*} sightBox The players FOV
 * @param {*} currentMap The map the player is in
 * @param {*} monster The monster we're moving
 */
export default function healer(sightBox, currentMap, monster) {
    return (dispatch, getState) => {
        const { id, position, hp, maxHp } = monster;

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
            if (hp <= maxHp / 2) {
                // Attempt to heal some health
                dispatch(monsterCastSpell(monster));
            } else if (playerInRange(player.position, monsterPosition)) {
                // check if player is in range
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
