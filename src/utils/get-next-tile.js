import { spriteToCoordinates } from './sprite-to-coordinates';

/**
 * Get the value of the next tile that an entity will be moving to
 *
 * @param {*} world The world that the game is being played in
 * @param {*} newPos The position the entity is trying to move to
 */
export default function getNextTile(world, newPos) {
    const { gameMode, storyMaps, currentMap, randomMaps, floorNum } = world;

    let currentMapData;
    if (gameMode === 'story') {
        currentMapData = storyMaps[currentMap];
    } else {
        currentMapData = randomMaps[floorNum - 1];
    }

    const { tiles } = currentMapData;
    // Convert the sprite coordinates to real coordinates
    const { x, y } = spriteToCoordinates(newPos);

    // Safely return the tiles value, otherwise return a wall
    return tiles[y] && tiles[y][x] ? tiles[y][x].value : 5;
}
