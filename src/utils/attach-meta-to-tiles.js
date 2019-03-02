import _cloneDeep from 'lodash.clonedeep';

export default function attachMetaToTiles(tiles) {

  const newTiles = _cloneDeep(tiles);

  newTiles.forEach((_, tileRowIndex) => {
    newTiles[tileRowIndex].forEach((_, tileIndex) => {
      newTiles[tileRowIndex][tileIndex] = {
        // give each tile a 'value'
        value: newTiles[tileRowIndex][tileIndex],
        // this is used for showing visited tiles
        explored: 0,
        // add a variation for tiles that allow for it (random num: 1 - 4)
        variation: Math.round(Math.random() * (4 - 1) + 1)
      };
    });
  });

  return newTiles;
}