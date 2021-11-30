import { observeImpassable, checkForOtherMonster } from './move-monster';
import { SPRITE_SIZE } from '../../../config/constants';

/**
 * Move the monster in a frightened manner.
 *
 * In future it would be good to have the monster run away from the player instead of randomly moving
 *
 * @param {*} sightBox The players FOV
 * @param {*} currentMap The map the player is in
 * @param {*} monster The monster we're moving
 */
function moveFrightened(sightBox, currentMap, monster) {
    return (dispatch, getState) => {
        const playerPosition = getState().player.position;
        const { id, position } = monster;

        const possibleDirections = [];

        const up = [position[0], position[1] - SPRITE_SIZE];
        if (
            playerPosition[1] !== position[1] - SPRITE_SIZE &&
            dispatch(observeImpassable(up)) &&
            !dispatch(checkForOtherMonster(id, up, currentMap))
        ) {
            possibleDirections.push([position[0], position[1] - SPRITE_SIZE]);
        }

        const down = [position[0], position[1] + SPRITE_SIZE];
        if (
            playerPosition[1] !== position[1] + SPRITE_SIZE &&
            dispatch(observeImpassable(down)) &&
            !dispatch(checkForOtherMonster(id, down, currentMap))
        ) {
            possibleDirections.push([position[0], position[1] + SPRITE_SIZE]);
        }

        const left = [position[0] - SPRITE_SIZE, position[1]];
        if (
            playerPosition[0] !== position[0] - SPRITE_SIZE &&
            dispatch(observeImpassable(left)) &&
            !dispatch(checkForOtherMonster(id, left, currentMap))
        ) {
            possibleDirections.push([position[0] - SPRITE_SIZE, position[1]]);
        }

        const right = [position[0] + SPRITE_SIZE, position[1]];
        if (
            playerPosition[0] !== position[0] + SPRITE_SIZE &&
            dispatch(observeImpassable(right)) &&
            !dispatch(checkForOtherMonster(id, right, currentMap))
        ) {
            possibleDirections.push([position[0] + SPRITE_SIZE, position[1]]);
        }

        if (possibleDirections.length > 0) {
            // Choose a random position to move to
            const newPosition =
                possibleDirections[
                    Math.floor(Math.random() * possibleDirections.length)
                ];
            const newMonsterPos = newPosition.map(value => value / SPRITE_SIZE);

            let inSight = false;
            // look through each current sight box tile
            sightBox.forEach(tile => {
                // if the monster is in sight
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
            // move the monster
            dispatch({
                type: 'MOVE_MONSTER',
                payload: {
                    map: currentMap,
                    id,
                    position: newPosition,
                    direction:
                        newPosition[0] < position[0]
                            ? 'WEST'
                            : newPosition[0] > position[0]
                            ? 'EAST'
                            : monster.direction,
                },
            });
        }
    };
}

export default function frightened(sightBox, currentMap, monster) {
    return dispatch => {
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
        }

        dispatch(moveFrightened(sightBox, currentMap, monster));

        if (monster.aiTurns === 0) {
            dispatch({
                type: 'CHANGE_AI',
                payload: {
                    map: currentMap,
                    ai: 'normal',
                    id,
                    from: 'frightened',
                    turns: 0,
                    entity: monster.type,
                    original: monster.originalAI,
                },
            });
        }
    };
}
