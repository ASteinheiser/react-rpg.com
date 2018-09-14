import store from '../config/store';
import maps  from '../data/maps';

export default function resetGameState() {
  // need to clean out any old values that were
  // set for blood spills and opened chests
  Object.keys(maps).forEach(mapName => {
    for(let i = 0; i < maps[mapName].tiles.length; i ++) {
      for(let j = 0; j < maps[mapName].tiles[i].length; j++) {

        switch (maps[mapName].tiles[i][j]) {

          // close all the treasure chests
          case -2:
            maps[mapName].tiles[i][j] = 4;
            break;

          // clean up blood
          case -1:
            maps[mapName].tiles[i][j] = 0;
            break;

          default:
        }
      }
    }
  });

  store.dispatch({
    type: 'RESET',
    payload: {}
  })
}
