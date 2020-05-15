import getNextTile from '../../../utils/get-next-tile';
import { SPRITE_SIZE } from '../../../config/constants';
import { radiusTiles } from '../../../utils/get-surrounding-tiles';

const MONSTER_ATTACK_RADIUS = 1;
export function getRandomDirection() {
    const directions = ['up', 'down', 'left', 'right'];
    const randomNumber = Math.floor(Math.random() * directions.length);
    return directions[randomNumber];
}

export function playerInRange(playerPos, monsterPos) {
    let inRange = false;
    // for each tile around the monster
    radiusTiles(MONSTER_ATTACK_RADIUS).forEach(tile => {
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

export function checkForOtherMonster(id, position, currentMap) {
    return (_, getState) => {
        // get current monsters
        const monsterList = getState().monsters.components[currentMap];
        // check list of monsters
        Object.keys(monsterList).forEach(monsterId => {
            // see if there's another monster in the next position
            if (
                JSON.stringify(monsterList[monsterId].position) ===
                JSON.stringify(position)
            ) {
                if (monsterId !== id) {
                    return monsterId;
                }
            }
        });

        return undefined;
    };
}
