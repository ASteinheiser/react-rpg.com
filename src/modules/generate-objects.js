import { MAP_DIMENSIONS } from '../config/constants';
// randomly generates chests, stairs and shops onto an existing random map
export default function generateObjects(map, floorNum, playerPos) {
  let availableTiles = [];

  for (let i = 0; i < MAP_DIMENSIONS[0]; i++) {
    for (let j = 0; j < MAP_DIMENSIONS[1]; j++) {
      // get a list of floor tiles that don't contain the player
      if(map[i][j] === 0 && JSON.stringify([i, j]) !== JSON.stringify(playerPos)) {
        availableTiles.push([i, j]);
      }
    }
  }

  // show stairs down if floor is greater than 1
  if(floorNum > 1) {
    map[playerPos[1]][playerPos[0]] = 2;
  };

  // generate stairs up
  let randomIndex = Math.floor(Math.random() * availableTiles.length);
  let tile = availableTiles[randomIndex];

  map[tile[0]][tile[1]] = 3;
  availableTiles.splice(randomIndex, 1);

  // generate a random number of chests between 2 - 5
  const randomChests = Math.round(Math.random() * (5 - 2) + 2);
  // place the chests on empty tiles
  for(let x = 0; x < randomChests; x++) {
    randomIndex = Math.floor(Math.random() * availableTiles.length);
    tile = availableTiles[randomIndex];

    map[tile[0]][tile[1]] = 4;
    availableTiles.splice(randomIndex, 1);
  }

  // TODO: generate a shop every 4 floors

  return map;
}