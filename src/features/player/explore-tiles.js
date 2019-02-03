import getSurroundingTiles from '../../modules/get-surrounding-tiles';
import store               from '../../config/store';

export default function exploreTiles(newPos) {

  const { tiles, paddingTiles } = getSurroundingTiles(newPos);

  // explore the tiles
  store.dispatch({
    type: 'EXPLORE_TILES',
    payload: {
      tiles,
      paddingTiles
    }
  });
}
