import { MAP_DIMENSIONS }  from '../config/constants';
import generateMonsterType from './generate-monster-type';
// generates a random map based on the floor number, map tiles, player's position, and level
export default function generateMonsters(floorNum, map, playerPos, playerLv) {
  let availableTiles = [];

  for (let i = 0; i < MAP_DIMENSIONS[0]; i++) {
    for (let j = 0; j < MAP_DIMENSIONS[1]; j++) {
      // get a list of floor tiles that don't contain the player
      if(map[i][j].value === 0 && JSON.stringify([i, j]) !== JSON.stringify(playerPos)) {
        availableTiles.push([j, i]);
      }
    }
  }

  // generate number of monsters for the map based on floor number and player level
  const numberMonsters = (floorNum / playerLv) * 3;
  let monsterTiles = [];
  // get an array of tiles to position the random monsters
  for(let x = 0; x < numberMonsters; x ++) {
    const randomIndex = Math.floor(Math.random() * availableTiles.length);
    monsterTiles.push(availableTiles[randomIndex]);
  }
  
  // generate the monster type and create an array of monster objects
  return monsterTiles.map(position => {

    const type = generateMonsterType(playerLv);

    return { position, type };
  });
}
