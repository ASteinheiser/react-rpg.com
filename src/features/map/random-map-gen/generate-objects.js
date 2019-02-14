import { MAP_DIMENSIONS }  from '../../../config/constants';
import getSurroundingTiles from '../../../modules/get-surrounding-tiles';
import arrContainArr       from '../../../modules/arr-contain-arr';
// randomly generates chests, stairs and shops onto an existing random map
export default function generateObjects(map, floorNum, playerPos, wallType) {
  let initialTiles = [];

  let vision = getSurroundingTiles(playerPos).tiles;

  for (let i = 0; i < MAP_DIMENSIONS[0]; i++) {
    for (let j = 0; j < MAP_DIMENSIONS[1]; j++) {
      // get a list of floor tiles
      if(map[i][j] === 0) {
        initialTiles.push([i, j]);
      }
    }
  }

  let availableTiles = initialTiles.filter(value => {
    // remove the available tiles that are vision tiles
    return !arrContainArr(vision, value);
  });

  // show stairs down if floor is greater than 1
  if(floorNum > 1) {
    map[playerPos[1]][playerPos[0]] = 2;
  };

  if(availableTiles.length > 0) {
    // generate stairs up OUTSIDE the player's sight if possible
    let randomIndex = Math.floor(Math.random() * availableTiles.length);
    let tile = availableTiles[randomIndex];

    map[tile[0]][tile[1]] = 3;
    availableTiles.splice(randomIndex, 1);
  } else {
    // if we don't have room outside player sight, place stairs on any floor tile
    let randomIndex = Math.floor(Math.random() * initialTiles.length);
    let tile = initialTiles[randomIndex];
    // make sure we dont place it on top of the player
    if(!(tile[0] === playerPos[1] && tile[1] === playerPos[0])) {
      map[tile[0]][tile[1]] = 3;
    } // remove the player's position from available tiles and get another random one
    else {
      initialTiles.splice(randomIndex, 1);

      let newRandomIndex = Math.floor(Math.random() * initialTiles.length);
      let newTile = initialTiles[newRandomIndex];

      map[newTile[0]][newTile[1]] = 3;
    }
  }

  // generate a random number of chests between 0 - 5
  const max = 5;
  const min = 0;
  const randomChests = Math.round(Math.random() * (max - min) + min);
  // place the chests on empty tiles
  for(let x = 0; x < randomChests; x++) {
    if(availableTiles.length > 0) {
      let randomIndex = Math.floor(Math.random() * availableTiles.length);
      let tile = availableTiles[randomIndex];

      map[tile[0]][tile[1]] = 4;
      availableTiles.splice(randomIndex, 1);
    }
  }

  // generate a shop every 4 floors
  if(floorNum % 4 === 0) {
    let availableWalls = [];
    
    // get a list of available wall tiles
    for (let i = 0; i < MAP_DIMENSIONS[0]; i++) {
      for (let j = 0; j < MAP_DIMENSIONS[1]; j++) {
        // make sure the wall tile touches a path so it can be reached
        if(map[i][j] === wallType &&
          (((i - 1 > 0) && map[i - 1][j] === 0)
          || ((i + 1 < MAP_DIMENSIONS[0]) && map[i + 1][j] === 0)
          || ((j - 1 > 0) && map[i][j - 1] === 0)
          || ((j + 1 < MAP_DIMENSIONS[1]) && map[i][j + 1] === 0))) {
          availableWalls.push([i, j]);
        }
      }
    }

    map = generateShop(map, availableWalls);
  }

  return map;
}

function generateShop(map, availableWalls) {
  if(availableWalls.length > 0) {
    const randomIndex = Math.floor(Math.random() * availableWalls.length);
    let tile = availableWalls[randomIndex];

    map[tile[0]][tile[1]] = 9;
  }
  return map;
}