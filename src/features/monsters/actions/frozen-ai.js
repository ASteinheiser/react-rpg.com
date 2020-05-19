import { SPRITE_SIZE } from '../../../config/constants';

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
                },
            });
        }
    };
}
