import store from '../../config/store';
import {
  SPRITE_SIZE,
  SIGHT_RADIUS
} from '../../config/constants';

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
  // set the 'explore' or 'player viewing' radius
  let radius = SIGHT_RADIUS;
  let newTiles = [];
  let x, y;
  // move out from center for radius length
  for (y = -radius; y <= radius; y++) {
    for (x = -radius; x <= radius; x++) {
      // find each surrounding tile
      if ((x * x) + (y * y) <= (radius * radius)) {
        // get radius with player location as offset
        let offsetX = x + startPos[0];
        let offsetY = y + startPos[1];
        // if it is inside the bounds
        if(offsetX >= 0 && offsetX < 15 && offsetY >= 0 && offsetY < 20) {
          // explore this tile...
          newTiles.push([offsetX, offsetY]);
        }
      }
    }
  }
  return newTiles;
}
