import generateMonsterType from './generate-monster-type';
import arrContainArr       from '../../../utils/arr-contain-arr';
import getSurroundingTiles from '../../../utils/get-surrounding-tiles';
import { MAP_DIMENSIONS }  from '../../../config/constants';
// generates random monsters for a random map
export default function generateMonsters(floorNum, map, playerPos, playerLv) {

  let availableTiles = [];
  // we need to get the tiles from the surrounding tiles func,
  // then reverse the coordinates because they come back in normal notation (y, x)
  // but for the random map gen, we need them in (x, y)
  const vision = getSurroundingTiles(playerPos).tiles.map(tile => tile.reverse());

  for (let i = 0; i < MAP_DIMENSIONS[1]; i++) {
    for (let j = 0; j < MAP_DIMENSIONS[0]; j++) {
      // some maps have their meta attached, some dont, so we need to read the value either way
      const mapValue = typeof map[i][j] === 'object' ? map[i][j].value : map[i][j];
      // get a list of floor tiles
      if(mapValue === 0) {
        availableTiles.push([i, j]);
      }
    }
  }

  availableTiles = availableTiles.filter(value => {
    // remove the available tiles that are vision tiles
    return !arrContainArr(vision, value);
  });

  // generate number of monsters for the map based on floor number and player level
  const numberMonsters = Math.ceil(floorNum / playerLv) * (Math.round(Math.random() * (4 - 2) + 2));
  const monsterTiles = [];
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
    // reverse the position from the generated map,
    // as it is in [y, x], and now we need to change to [x, y] (normal notation)
    position = position.reverse();

    const type = generateMonsterType(playerLv);

    return { position, type };
  });
}