import store              from '../../config/store';
import generateMap        from '../../modules/generate-map';
import showEndlessMessage from '../../modules/show-endless-message';
import { uuidv4 }         from '../../modules/uuid-v4';
import { SPRITE_SIZE }    from '../../config/constants';

export default function walkStairs(nextTile, playerPos) {
  const { gameMode, randomMaps, floorNum, currentMap, storyMaps } = store.getState().world;

  playerPos = playerPos.map(value => value / SPRITE_SIZE);

  let direction;
  // player wants to go down
  if(nextTile === 2) direction = 'down';
  // player wants to go up
  if(nextTile === 3) direction = 'up';

  if(gameMode === 'endless') {
    if(direction === 'up') {
      // conditionally show a message based on floorNum
      showEndlessMessage(floorNum);
      // if we have reached a new floor
      if(floorNum === randomMaps.length) {
        // generate a random map, save it, and set it as the current map
        const randomMap = generateMap(playerPos, floorNum + 1);
        const mapId = uuidv4();

        store.dispatch({
          type: 'ADD_RANDOM_MAP',
          payload: {
            tiles: randomMap,
            id: mapId
          }
        });
        store.dispatch({
          type: 'SET_CURR_MAP',
          payload: {
            map: mapId,
            floorNum: floorNum + 1
          }
        });
      } else {
        // figure out the next map and set it as the current
        store.dispatch({
          type: 'SET_CURR_MAP',
          payload: {
            // pass the floorNum because with array indexing this will get the next map
            map: randomMaps[floorNum].id,
            floorNum: floorNum + 1
          }
        });
      }
    } else if(direction === 'down' && floorNum > 1) {
      // figure out the previous map and set it as the current
      store.dispatch({
        type: 'SET_CURR_MAP',
        payload: {
          // offset by 2 because we want the previous map and account for array indexing
          map: randomMaps[floorNum - 2].id,
          floorNum: floorNum - 1
        }
      });
    }
  } else {
    // change the story mode map
    store.dispatch({
      type: 'LOAD_NEXT_MAP',
      payload: { direction, currentMap, storyMaps }
    });
  }
}