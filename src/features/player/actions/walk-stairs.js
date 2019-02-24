import _debounce from 'lodash.debounce';

import generateMap        from '../../map/random-map-gen/generate-map';
import randomMapMessage   from '../../map/random-map-gen/random-map-message';
import uuidv4             from '../../../utils/uuid-v4';
import { SPRITE_SIZE, MAP_TRANSITION_DELAY } from '../../../config/constants';

export default function walkStairs(nextTile, playerPos) {
  return _debounce((dispatch, getState) => {

    const { gameMode, randomMaps, floorNum, currentMap, storyMaps } = getState().world;

    playerPos = playerPos.map(value => value / SPRITE_SIZE);

    let direction;
    // player wants to go down
    if(nextTile === 2) direction = 'down';
    // player wants to go up
    if(nextTile === 3) direction = 'up';

    if(gameMode === 'endless') {
      if(direction === 'up') {
        // conditionally show a message based on floorNum
        dispatch(randomMapMessage(floorNum));
        // if we have reached a new floor
        if(floorNum === randomMaps.length) {
          // generate a random map, save it, and set it as the current map
          const randomMap = generateMap(playerPos, floorNum + 1);
          const mapId = uuidv4();

          dispatch({
            type: 'ADD_RANDOM_MAP',
            payload: {
              tiles: randomMap,
              id: mapId
            }
          });
          dispatch({
            type: 'SET_ENDLESS_MAP',
            payload: {
              map: mapId,
              floorNum: floorNum + 1
            }
          });
        }
        else {
          // figure out the next map and set it as the current
          dispatch({
            type: 'SET_ENDLESS_MAP',
            payload: {
              // pass the floorNum because with array indexing this will get the next map
              map: randomMaps[floorNum].id,
              floorNum: floorNum + 1
            }
          });
        }
      }
      else if(direction === 'down' && floorNum > 1) {
        // figure out the previous map and set it as the current
        dispatch({
          type: 'SET_ENDLESS_MAP',
          payload: {
            // offset by 2 because we want the previous map and account for array indexing
            map: randomMaps[floorNum - 2].id,
            floorNum: floorNum - 1
          }
        });
      }
    }
    else {
      // change the story mode map
      dispatch({
        type: 'SET_STORY_MAP',
        payload: { direction, currentMap, storyMaps }
      });
    }
  }, MAP_TRANSITION_DELAY);
}