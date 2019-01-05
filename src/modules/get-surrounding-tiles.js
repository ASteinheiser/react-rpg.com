import { SIGHT_RADIUS, MAP_DIMENSIONS, SPRITE_SIZE } from '../config/constants';

let x, y;
export const radiusTiles = [];
// calculate a tile map with desired radius
// (results in array = [[-4,-4]...[0,0]...[4,4]] )
for (y = -SIGHT_RADIUS; y <= SIGHT_RADIUS; y++) {
  for (x = -SIGHT_RADIUS; x <= SIGHT_RADIUS; x++) {
    if ((x * x) + (y * y) <= (SIGHT_RADIUS * SIGHT_RADIUS)) {
      radiusTiles.push({x, y});
    }
  }
}

// takes an array of relative coordinates to the map size (20 x 15) i.e. [1, 1]
export default function getSurroundingTiles(newPos) {
  // make sure the new position is in relative map tile size
  let x = newPos[1] % SPRITE_SIZE === 0 ? newPos[1] / SPRITE_SIZE : newPos[1];
  let y = newPos[0] % SPRITE_SIZE === 0 ? newPos[0] / SPRITE_SIZE : newPos[0];
  // set tile to relative tile position
  const startPos = [x, y];
  // make sure the start position is within the bounds
  if(startPos[0] >= MAP_DIMENSIONS[0] || startPos[0] < 0
    || startPos[1] >= MAP_DIMENSIONS[1] || startPos[1] < 0) return false;
  // then calculate the surrounding tiles according to the bounds
  let surroundingTiles = [];
  // add position as offset to each radius tile
  radiusTiles.forEach(({x, y}) => {
    // get radius with location as offset
    let offsetX = x + startPos[0];
    let offsetY = y + startPos[1];
    // if it is inside the bounds
    if(offsetX >= 0 && offsetX < 15 && offsetY >= 0 && offsetY < 20) {
      // add to surrounding tile...
      surroundingTiles.push([offsetX, offsetY]);
    }
  });
  return surroundingTiles;
}
