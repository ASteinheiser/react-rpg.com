import { MAP_DIMENSIONS }  from '../config/constants';
import generateMonsterType from './generate-monster-type';
import getSurroundingTiles from './get-surrounding-tiles';
import arrContainArr       from './arr-contain-arr';
// generates random monsters for a random map
export default function generateMonsters(floorNum, map, playerPos, playerLv) {
  let availableTiles = [];

  let vision = getSurroundingTiles(playerPos).tiles;
  // reverse the indexes of the vision tiles to match the available tiles order
  vision = vision.map(value => {
    return [value[1], value[0]];
  });

  for (let i = 0; i < MAP_DIMENSIONS[0]; i++) {
    for (let j = 0; j < MAP_DIMENSIONS[1]; j++) {
      // get a list of floor tiles
      if(map[i][j].value === 0) {
        availableTiles.push([j, i]);
      }
    }
  }

  availableTiles = availableTiles.filter(value => {
    // remove the available tiles that are vision tiles
    return !arrContainArr(vision, value);
  });

  // generate number of monsters for the map based on floor number and player level
  const numberMonsters = Math.ceil(floorNum / playerLv) * (Math.round(Math.random() * (4 - 2) + 2));
  let monsterTiles = [];
  // get an array of tiles to position the random monsters
  for(let x = 0; x < numberMonsters; x ++) {
    if(availableTiles.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableTiles.length);
      monsterTiles.push(availableTiles[randomIndex]);
      availableTiles.splice(randomIndex, 1);
    }
  }

  // generate the monster type and create an array of monster objects
  return monsterTiles.map(position => {

    const type = generateMonsterType(playerLv);

    return { position, type };
  });
}