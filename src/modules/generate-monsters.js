import { MAP_DIMENSIONS }  from '../config/constants';
import generateMonsterType from './generate-monster-type';
import getSurroundingTiles from './get-surrounding-tiles';
// generates a random map based on the floor number, map tiles, player's position, and level
export default function generateMonsters(floorNum, map, playerPos, playerLv) {
  let availableTiles = [];
  let vision = getSurroundingTiles(playerPos);

  for (let i = 0; i < MAP_DIMENSIONS[0]; i++) {
    for (let j = 0; j < MAP_DIMENSIONS[1]; j++) {
      // get a list of floor tiles and remove player sight from available tiles
      if(map[i][j].value === 0) {
        let push = true;

        for(let z = 0; z < vision.length; z ++) {
          if(vision[z][0] === i && vision[z][1] === j) {
            push = false;
          }
        }

        if(push) availableTiles.push([j, i]);
      }
    }
  }

  // generate number of monsters for the map based on floor number and player level
  const numberMonsters = Math.ceil(floorNum / playerLv) * 3;
  let monsterTiles = [];
  // get an array of tiles to position the random monsters
  for(let x = 0; x < numberMonsters; x ++) {
    const randomIndex = Math.floor(Math.random() * availableTiles.length);
    monsterTiles.push(availableTiles[randomIndex]);
    availableTiles.splice(randomIndex, 1);
  }
  
  // generate the monster type and create an array of monster objects
  return monsterTiles.map(position => {

    const type = generateMonsterType(playerLv);

    return { position, type };
  });
}
