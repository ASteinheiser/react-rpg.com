import store from '../config/store';
import maps  from '../data/maps';

export default function resetGameState() {
  // need to clean out any old values that were
  // set for blood spills and opened chests
  Object.keys(maps).forEach(mapName => {
    for(let i = 0; i < maps[mapName].tiles.length; i ++) {
      for(let j = 0; j < maps[mapName].tiles[i].length; j++) {
        // check the tile type
        let value = maps[mapName].tiles[i][j];
        // pull value off the object
        if(typeof value === 'object') value = value.value;

        switch (value) {
          // close all the treasure chests
          case -2:
            maps[mapName].tiles[i][j] = {
              value: 4,
              explored: 0
            };
            break;
          // clean up blood
          case -1:
            maps[mapName].tiles[i][j] = {
              value: 0,
              explored: 0
            };
            break;
          default:
            // hide explored on rest of tiles,
            // but set their original values
            maps[mapName].tiles[i][j] = {
              value,
              explored: 0
            }
        }
      }
    }
  });

  store.dispatch({
    type: 'RESET',
    payload: {}
  })
}
