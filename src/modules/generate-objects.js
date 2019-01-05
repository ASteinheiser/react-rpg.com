import { MAP_DIMENSIONS }  from '../config/constants';
import getSurroundingTiles from './get-surrounding-tiles';
import arrContainArr       from './arr-contain-arr';
// randomly generates chests, stairs and shops onto an existing random map
export default function generateObjects(map, floorNum, playerPos) {
  let availableTiles = [];

  let vision = getSurroundingTiles(playerPos);

  for (let i = 0; i < MAP_DIMENSIONS[0]; i++) {
    for (let j = 0; j < MAP_DIMENSIONS[1]; j++) {
      // get a list of floor tiles
      if(map[i][j] === 0) {
        availableTiles.push([i, j]);
      }
    }
  }

  availableTiles = availableTiles.filter(value => {
    // remove the available tiles that are vision tiles
    return !arrContainArr(vision, value);
  });

  // show stairs down if floor is greater than 1
  if(floorNum > 1) {
    map[playerPos[1]][playerPos[0]] = 2;
  };

  // generate stairs up
  let randomIndex = Math.floor(Math.random() * availableTiles.length);
  let tile = availableTiles[randomIndex];

  map[tile[0]][tile[1]] = 3;
  availableTiles.splice(randomIndex, 1);

  // generate a random number of chests between 0 - 5
  const max = 5;
  const min = 0;
  const randomChests = Math.round(Math.random() * (max - min) + min);
  // place the chests on empty tiles
  for(let x = 0; x < randomChests; x++) {
    randomIndex = Math.floor(Math.random() * availableTiles.length);
    tile = availableTiles[randomIndex];

    map[tile[0]][tile[1]] = 4;
    availableTiles.splice(randomIndex, 1);
  }

  // generate a shop every 4 floors
  if(floorNum % 4 === 0) {
    let availableWalls = [];
    
    // get a list of available wall tiles
    for (let i = 0; i < MAP_DIMENSIONS[0]; i++) {
      for (let j = 0; j < MAP_DIMENSIONS[1]; j++) {
        // make sure the wall tile touches a path so it can be reached
        if(map[i][j] === 5 &&
          (((i - 1 > 0) && map[i - 1][j] === 0)
          || ((i + 1 < MAP_DIMENSIONS[0]) && map[i + 1][j] === 0)
          || ((j - 1 > 0) && map[i][j - 1] === 0)
          || ((j + 1 < MAP_DIMENSIONS[1]) && map[i][j + 1] === 0))) {
          availableWalls.push([i, j]);
        }
      }
    }

    randomIndex = Math.floor(Math.random() * availableWalls.length);
    tile = availableWalls[randomIndex];

    map[tile[0]][tile[1]] = 9;
  }

  return map;
}