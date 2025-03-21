import { getNewPosition } from '../../player/actions/move-player';
import getNextTile from '../../../utils/get-next-tile';
import { SPRITE_SIZE } from '../../../config/constants';
import { radiusTiles } from '../../../utils/get-surrounding-tiles';

const MONSTER_ATTACK_RADIUS = 1;
export function getRandomDirection() {
    const directions = ['up', 'down', 'left', 'right'];
    const randomNumber = Math.floor(Math.random() * directions.length);
    return directions[randomNumber];
}

export const playerInView = (monsterPosition, range) => {
    return (dispatch, getState) => {
        const { position } = getState().player;

        monsterPosition = monsterPosition.map(val => val * SPRITE_SIZE);
        range *= SPRITE_SIZE;

        for (
            let y = monsterPosition[1];
            y > monsterPosition[1] - range;
            y -= SPRITE_SIZE
        ) {
            const pos = getNewPosition([monsterPosition[0], y], 'NORTH');
            if (!dispatch(observeImpassable(pos))) break;
            if (position[0] === pos[0] && position[1] === pos[1]) {
                return true;
            }
        }
        for (
            let y = monsterPosition[1];
            y < monsterPosition[1] + range;
            y += SPRITE_SIZE
        ) {
            const pos = getNewPosition([monsterPosition[0], y], 'SOUTH');
            if (!dispatch(observeImpassable(pos))) break;
            if (position[0] === pos[0] && position[1] === pos[1]) {
                return true;
            }
        }

        for (
            let x = monsterPosition[0];
            x < monsterPosition[0] + range;
            x += SPRITE_SIZE
        ) {
            const pos = getNewPosition([x, monsterPosition[1]], 'EAST');
            if (!dispatch(observeImpassable(pos))) break;
            if (position[0] === pos[0] && position[1] === pos[1]) {
                return true;
            }
        }

        for (
            let x = monsterPosition[0];
            x > monsterPosition[0] - range;
            x -= SPRITE_SIZE
        ) {
            const pos = getNewPosition([x, monsterPosition[1]], 'WEST');
            if (!dispatch(observeImpassable(pos))) break;
            if (position[0] === pos[0] && position[1] === pos[1]) {
                return true;
            }
        }

        return false;
    };
};

export function playerInRange(
    playerPos,
    monsterPos,
    range = MONSTER_ATTACK_RADIUS
) {
    let inRange = false;
    // for each tile around the monster
    radiusTiles(range).forEach(tile => {
        // add the monsters location
        const offsetX = tile.x + monsterPos[0];
        const offsetY = tile.y + monsterPos[1];
        // see if the player is in range
        const playerLocation = playerPos.map(value => value / SPRITE_SIZE);
        if (
            JSON.stringify([offsetX, offsetY]) ===
            JSON.stringify(playerLocation)
        ) {
            inRange = true;
        }
    });
    return inRange;
}

export function observeImpassable(newPos) {
    return (_, getState) => {
        const nextTile = getNextTile(getState().world, newPos);

        return nextTile < 5 ? newPos : false;
    };
}

/**
 * Check to see if any other monster is at the position this monster is trying to move to
 *
 * @param {*} id The id of the monster that's trying to move
 * @param {*} position The position its moving to
 * @param {*} currentMap THe map that the monsrer is in
 */
export function checkForOtherMonster(id, position, currentMap) {
    return (_, getState) => {
        // get current monsters
        const monsterList = getState().monsters.components[currentMap];
        // check list of monsters
        return Object.keys(monsterList)
            .filter(monsterID => {
                const monster = monsterList[monsterID];
                // see if there's another monster in the next position
                return (
                    monsterID !== id &&
                    monster.position[0] === position[0] &&
                    monster.position[1] === position[1]
                );
            })
            .pop();
    };
}
