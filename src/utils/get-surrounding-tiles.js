import { SIGHT_RADIUS, MAP_DIMENSIONS, SPRITE_SIZE } from '../config/constants';

export const radiusTiles = (radiusSize = SIGHT_RADIUS) => {
  let x, y;
  const radTiles = [];
  // calculate a tile map with desired radius
  // (results in array = [[-4,-4]...[0,0]...[4,4]] )
  for (y = -radiusSize; y <= radiusSize; y++) {
    for (x = -radiusSize; x <= radiusSize; x++) {
      if ((x * x) + (y * y) <= (radiusSize * radiusSize)) {
        radTiles.push({x, y});
      }
    }
  }
  return radTiles;
};

// takes an array of relative coordinates to the map size (20 x 15) i.e. [1, 1]
export default function getSurroundingTiles(newPos) {
  // make sure the new position is in relative map tile size
  const x = newPos[0] % SPRITE_SIZE === 0 ? newPos[0] / SPRITE_SIZE : newPos[0];
  const y = newPos[1] % SPRITE_SIZE === 0 ? newPos[1] / SPRITE_SIZE : newPos[1];
  // set tile to relative tile position
  const startPos = [x, y];
  // make sure the start position is within the bounds
  if(startPos[0] >= MAP_DIMENSIONS[0] || startPos[0] < 0
    || startPos[1] >= MAP_DIMENSIONS[1] || startPos[1] < 0) return false;
  // then calculate the surrounding tiles according to the bounds
  const surroundingTiles = [];
  const paddingTiles = [];
  // add position as offset to each radius tile
  radiusTiles().forEach(({x, y}) => {
    // get radius with location as offset
    const offsetX = x + startPos[0];
    const offsetY = y + startPos[1];
    // if it is inside the bounds
    if(offsetX >= 0 && offsetX < MAP_DIMENSIONS[0]
      && offsetY >= 0 && offsetY < MAP_DIMENSIONS[1]) {
      // add to surrounding tile...
      surroundingTiles.push([offsetX, offsetY]);
    } // otherwise add the tile to padding tiles array
    else {
      paddingTiles.push([offsetX, offsetY]);
    }
  });

  return {
    tiles: surroundingTiles,
    paddingTiles
  };
}
