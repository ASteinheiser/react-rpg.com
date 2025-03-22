import _cloneDeep from 'lodash.clonedeep';

/**
 * The generation of maps doesn't touch on the extra items we need for processing.
 *
 * This will:
 *  Set the 'value' of a tile (basically what type of tile it is)
 *  Set the explored state of each tile provided to 0 (i.e. it hasn't been explored)
 *  Add some variation to tiles that support
 *
 * @param {*} tiles The tiles we want to attach this information too
 */
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
                variation: Math.round(Math.random() * (4 - 1) + 1),
            };
        });
    });

    return newTiles;
}
