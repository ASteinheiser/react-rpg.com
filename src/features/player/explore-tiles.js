import getSurroundingTiles from '../../modules/get-surrounding-tiles';
import store               from '../../config/store';
import { SPRITE_SIZE }     from '../../config/constants';

export default function exploreTiles(newPos) {
  let x = newPos[1] / SPRITE_SIZE;
  let y = newPos[0] / SPRITE_SIZE;
  // set tile to relative tile position
  let tile = [x, y];
  // make an array with new tile position
  let exploreTiles = [ tile ];
  // find the surrounding tiles and add them to the explore tiles
  exploreTiles = exploreTiles.concat(getSurroundingTiles(tile));
  // explore the tiles
  store.dispatch({
    type: 'EXPLORE_TILES',
    payload: {
      tiles: exploreTiles
    }
  })
}
