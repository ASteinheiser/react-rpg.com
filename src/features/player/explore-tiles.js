import getSurroundingTiles from '../../modules/get-surrounding-tiles';

export default function exploreTiles(newPos) {
  return dispatch => {
    const { tiles, paddingTiles } = getSurroundingTiles(newPos);

    // explore the tiles
    dispatch({
      type: 'EXPLORE_TILES',
      payload: {
        tiles,
        paddingTiles
      }
    });
  }
}
