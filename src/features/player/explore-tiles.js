import { SPRITE_SIZE } from '../../config/constants';
import store           from '../../config/store';

export default function exploreTiles(newPos) {
  // make a new array with new position
  let tilesArray = [
    [newPos[1] / SPRITE_SIZE, newPos[0] / SPRITE_SIZE]
  ];
  // find the surrounding tiles

  // explore the tiles
  store.dispatch({
    type: 'EXPLORE_TILES',
    payload: {
      tiles: tilesArray
    }
  })
}
