import { observeImpassable, checkForOtherMonster } from './move-monster';
import attackMonster from './attack-monster';
import { SPRITE_SIZE } from '../../../config/constants';

function moveScared(sightBox, currentMap, monster) {
    return (dispatch, getState) => {
        const playerPosition = getState().player.position;
        const { id, position } = monster;

        const possibleDirections = [];
        if (
            playerPosition[1] !== position[1] - SPRITE_SIZE &&
            dispatch(
                observeImpassable([position[0], position[1] - SPRITE_SIZE])
            )
        ) {
            possibleDirections.push([position[0], position[1] - SPRITE_SIZE]);
        }

        if (
            playerPosition[1] !== position[1] + SPRITE_SIZE &&
            dispatch(
                observeImpassable([position[0], position[1] + SPRITE_SIZE])
            )
        ) {
            possibleDirections.push([position[0], position[1] + SPRITE_SIZE]);
        }

        if (
            playerPosition[0] !== position[0] - SPRITE_SIZE &&
            dispatch(
                observeImpassable([position[0] - SPRITE_SIZE, position[1]])
            )
        ) {
            possibleDirections.push([position[0] - SPRITE_SIZE, position[1]]);
        }

        if (
            playerPosition[0] !== position[0] + SPRITE_SIZE &&
            dispatch(
                observeImpassable([position[0] + SPRITE_SIZE, position[1]])
            )
        ) {
            possibleDirections.push([position[0] + SPRITE_SIZE, position[1]]);
        }

        if (possibleDirections.length > 0) {
            const newPosition =
                possibleDirections[
                    Math.floor(Math.random() * possibleDirections.length)
                ];

            // From testing, this doesn't really happen... But, if the monster is scared,
            // it may randomly attack other monsters if they're in thise ones way
            const monsterID = dispatch(
                checkForOtherMonster(id, newPosition, currentMap)
            );

            if (monsterID) {
                // recalculate if the monster is in sight
                let inSight = false;
                // look through each current sight box tile
                sightBox.forEach(tile => {
                    // if the monster is in sight
                    const newMonsterPos = position.map(
                        value => value / SPRITE_SIZE
                    );
                    if (
                        JSON.stringify(tile) === JSON.stringify(newMonsterPos)
                    ) {
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

                dispatch(attackMonster(monster, monsterID, currentMap));
            } else {
                let inSight = false;
                // look through each current sight box tile
                sightBox.forEach(tile => {
                    // if the monster is in sight
                    const newMonsterPos = newPosition.map(
                        value => value / SPRITE_SIZE
                    );
                    if (
                        JSON.stringify(tile) === JSON.stringify(newMonsterPos)
                    ) {
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
                    },
                });
            }
        }
    };
}

export default function scared(sightBox, currentMap, monster) {
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

        dispatch(moveScared(sightBox, currentMap, monster));

        if (monster.aiTurns === 0) {
            dispatch({
                type: 'CHANGE_AI',
                payload: {
                    map: currentMap,
                    ai: 'normal',
                    id: monster.id,
                    from: 'scared',
                    turns: 0,
                    entity: monster.type,
                },
            });
        }
    };
}
