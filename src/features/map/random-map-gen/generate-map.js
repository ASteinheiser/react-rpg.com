import generateObjects from './generate-objects';
import { MAP_DIMENSIONS, MAX_TUNNELS, MAX_LENGTH } from '../../../config/constants';

// generates a random dungeon map
export default function generateMap(startPos, floorNum) {
  // change the walls of the dungeon as the floors get higher
  let wallType = 5;
  if(floorNum >= 30) wallType = 6;
  if(floorNum >= 60) wallType = 7;
  if(floorNum >= 90) wallType = 8;

  const map = createMapOfWalls(wallType), // create a map of walls to carve rooms and hallways from
      directions = [[-1, 0], [1, 0], [0, -1], [0, 1]]; // array to get a random direction from (left,right,up,down)
  let maxTunnels = MAX_TUNNELS, // store the max tunnels in a local variable that can be decremented
    currentRow = startPos ? startPos[1] : Math.floor(Math.random() * MAP_DIMENSIONS[1]), // our current row - start at a random spot
    currentColumn = startPos ? startPos[0] : Math.floor(Math.random() * MAP_DIMENSIONS[0]), // our current column - start at a random spot
    lastDirection = [], // save the last direction we went
    randomDirection; // next turn/direction - holds a value from directions

  // lets create some tunnels - while maxTunnels, MAP_DIMENSIONS, and MAX_LENGTH is greater than 0.
  while (maxTunnels && MAP_DIMENSIONS && MAX_LENGTH) {
    // lets get a random direction - until it is a perpendicular to our lastDirection
    // if the last direction = left or right,
    // then our new direction has to be up or down,
    // and vice versa
    do {
      randomDirection = directions[Math.floor(Math.random() * directions.length)];
    } while ((randomDirection[0] === -lastDirection[0] && randomDirection[1] === -lastDirection[1]) || (randomDirection[0] === lastDirection[0] && randomDirection[1] === lastDirection[1]));

    const randomLength = Math.ceil(Math.random() * MAX_LENGTH); // length the next tunnel will be (max of maxLength)
    let tunnelLength = 0; // current length of tunnel being created

    // lets loop until our tunnel is long enough or until we hit an edge
    while (tunnelLength < randomLength) {

      //break the loop if it is going out of the map
      if (((currentRow === 0) && (randomDirection[0] === -1)) ||
          ((currentColumn === 0) && (randomDirection[1] === -1)) ||
          ((currentRow === MAP_DIMENSIONS[1] - 1) && (randomDirection[0] === 1)) ||
          ((currentColumn === MAP_DIMENSIONS[0] - 1) && (randomDirection[1] === 1))) {
        break;
      }
      else {
        map[currentRow][currentColumn] = 0; //set the value of the index in map to 0 (a tunnel, making it one longer)
        currentRow += randomDirection[0]; //add the value from randomDirection to row and col (-1, 0, or 1) to update our location
        currentColumn += randomDirection[1];
        tunnelLength++; //the tunnel is now one longer, so lets increment that variable
      }
    }

    if (tunnelLength) { // update our variables unless our last loop broke before we made any part of a tunnel
      lastDirection = randomDirection; //set lastDirection, so we can remember what way we went
      maxTunnels--; // we created a whole tunnel so lets decrement how many we have left to create
    }
  }

  // all our tunnels have been created and now we run placeObjects(),
  // which will complete our map, so lets return it to our render()
  return generateObjects(map, floorNum, startPos, wallType);
}

// generate a map filled with wall tiles
function createMapOfWalls(wallType) {
  const array = [];
  for (let i = 0; i < MAP_DIMENSIONS[1]; i++) {
    array.push([]);
    for (let j = 0; j < MAP_DIMENSIONS[0]; j++) {
      array[i].push(wallType);
    }
  }
  return array;
}