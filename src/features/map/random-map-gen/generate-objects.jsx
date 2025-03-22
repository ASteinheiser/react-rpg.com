import arrContainArr from '../../../utils/arr-contain-arr';
import getSurroundingTiles from '../../../utils/get-surrounding-tiles';
import { MAP_DIMENSIONS } from '../../../config/constants';

/**
 * Generate all of the objects in the map, such as shops, chests.
 *
 * @param {*} map The map to generate the objects into
 * @param {*} floorNumber The floor number
 * @param {*} playerPosition The players position
 * @param {*} wallType The type of wall in the map
 */
export default function generateObjects(
    map,
    floorNumber,
    playerPosition,
    wallType
) {
    const initialTiles = [];
    // we need to get the tiles from the surrounding tiles func,
    // then reverse the coordinates because they come back in normal notation (y, x)
    // but for the random map gen, we need them in (x, y)
    const vision = getSurroundingTiles(playerPosition).tiles.map(tile =>
        tile.reverse()
    );

    for (let i = 0; i < MAP_DIMENSIONS[1]; i++) {
        for (let j = 0; j < MAP_DIMENSIONS[0]; j++) {
            // get a list of floor tiles
            if (map[i][j] === 0) {
                initialTiles.push([i, j]);
            }
        }
    }

    const availableTiles = initialTiles.filter(value => {
        // remove the available tiles that are vision tiles
        return !arrContainArr(vision, value);
    });

    // show stairs down if floor is greater than 1
    if (floorNumber > 1) {
        map[playerPosition[1]][playerPosition[0]] = 2;
    }

    // generate stairs up OUTSIDE the player's sight if possible
    if (availableTiles.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableTiles.length);
        const tile = availableTiles[randomIndex];

        map[tile[0]][tile[1]] = 3;
        availableTiles.splice(randomIndex, 1);
    } // if we don't have room outside player sight, place stairs on any floor tile
    else {
        const randomIndex = Math.floor(Math.random() * initialTiles.length);
        const tile = initialTiles[randomIndex];
        // if the tile is occupied by the player
        // remove the player's position from available tiles and get another random one
        if (tile[0] === playerPosition[1] && tile[1] === playerPosition[0]) {
            initialTiles.splice(randomIndex, 1);

            const newRandomIndex = Math.floor(
                Math.random() * initialTiles.length
            );
            const newTile = initialTiles[newRandomIndex];

            map[newTile[0]][newTile[1]] = 3;
        } // safely place the stairs
        else {
            map[tile[0]][tile[1]] = 3;
        }
    }

    // generate a random number of chests between 0 - 5
    const max = 5;
    const min = 0;
    const randomChests = Math.round(Math.random() * (max - min) + min);
    // place the chests on empty tiles
    for (let x = 0; x < randomChests; x++) {
        if (availableTiles.length > 0) {
            const randomIndex = Math.floor(
                Math.random() * availableTiles.length
            );
            const tile = availableTiles[randomIndex];

            map[tile[0]][tile[1]] = 4;
            availableTiles.splice(randomIndex, 1);
        }
    }

    // generate a shop every 4 floors
    if (floorNumber % 4 === 0) {
        const availableWalls = [];

        // get a list of available wall tiles
        for (let i = 0; i < MAP_DIMENSIONS[1]; i++) {
            for (let j = 0; j < MAP_DIMENSIONS[0]; j++) {
                // make sure the wall tile touches a path so it can be reached
                if (
                    map[i][j] === wallType &&
                    ((i - 1 > 0 && map[i - 1][j] === 0) ||
                        (i + 1 < MAP_DIMENSIONS[1] && map[i + 1][j] === 0) ||
                        (j - 1 > 0 && map[i][j - 1] === 0) ||
                        (j + 1 < MAP_DIMENSIONS[0] && map[i][j + 1] === 0))
                ) {
                    availableWalls.push([i, j]);
                }
            }
        }

        map = generateShop(map, availableWalls);
    }

    return map;
}

/**
 * Add a shop to the map
 *
 * @param {*} map The map we're working with
 * @param {*} availableWalls All of the available wall tiles
 */
function generateShop(map, availableWalls) {
    if (availableWalls.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableWalls.length);
        const tile = availableWalls[randomIndex];

        map[tile[0]][tile[1]] = 9;
    }
    return map;
}
