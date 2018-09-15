import store from '../../config/store';
import {
  SPRITE_SIZE,
  SIGHT_RADIUS
} from '../../config/constants';

let x, y;
const radiusTiles = [];
// calculate a tile map with desired radius
// (results in array = [[-4,-4]...[0,0]...[4,4]] )
for (y = -SIGHT_RADIUS; y <= SIGHT_RADIUS; y++) {
  for (x = -SIGHT_RADIUS; x <= SIGHT_RADIUS; x++) {
    if ((x * x) + (y * y) <= (SIGHT_RADIUS * SIGHT_RADIUS)) {
      radiusTiles.push({x, y});
    }
  }
}

export default function exploreTiles(newPos) {
  let x = newPos[1] / SPRITE_SIZE;
  let y = newPos[0] / SPRITE_SIZE;
  // set tile to relative tile position
  let tile = [x, y];
  // make an array with new tile position
  let exploreTiles = [ tile ];
  // find the surrounding tiles
  let nearTiles = getSurroundingTiles(tile);
  // push surrounding tiles to the explore tiles array
  nearTiles.forEach(tile => {
    exploreTiles.push(tile);
  });
  // explore the tiles
  store.dispatch({
    type: 'EXPLORE_TILES',
    payload: {
      tiles: exploreTiles
    }
  })
}

function getSurroundingTiles(startPos) {
  let newTiles = [];
  // add player position as offset to each radius tile
  radiusTiles.forEach(({x, y}) => {
    // get radius with player location as offset
    let offsetX = x + startPos[0];
    let offsetY = y + startPos[1];
    // if it is inside the bounds
    if(offsetX >= 0 && offsetX < 15 && offsetY >= 0 && offsetY < 20) {
      // explore this tile...
      newTiles.push([offsetX, offsetY]);
    }
  });
  return newTiles;
}
