import { SPRITE_SIZE } from '../../../config/constants';

/**
 * The monster can't move, so all this really does is reveal the monster
 * if they're in view, hide them if they're not, and then reverts their AI
 * if they're unfrozen.
 *
 * @param {*} sightBox The players FOV
 * @param {*} currentMap The map the player is in
 * @param {*} monster The monster we're moving
 */
export default function frozen(sightBox, currentMap, monster) {
    return dispatch => {
        const { id, position, direction } = monster;

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
        } else {
            // monster is too far away from the player
            dispatch({
                type: 'HIDE_MONSTER',
                payload: { id, map: currentMap },
            });
        }

        dispatch({
            type: 'MOVE_MONSTER',
            payload: {
                map: currentMap,
                id,
                position,
                direction,
            },
        });

        if (monster.aiTurns === 0) {
            dispatch({
                type: 'CHANGE_AI',
                payload: {
                    map: currentMap,
                    ai: monster.originalAI,
                    id,
                    from: 'frozen',
                    turns: 0,
                    entity: monster.type,
                    original: monster.originalAI,
                },
            });
        }
    };
}
