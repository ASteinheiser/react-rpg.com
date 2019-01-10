import React from 'react';

import GameTextDialog  from '../../components/game-text-dialog';
import store           from '../../config/store';
import generateMap     from '../../modules/generate-map';
import { uuidv4 }      from '../../modules/uuid-v4';
import { SPRITE_SIZE } from '../../config/constants';

export default function walkStairs(nextTile, playerPos) {
  const { gameMode, randomMaps, floorNum } = store.getState().world;

  playerPos = playerPos.map(value => value / SPRITE_SIZE);

  let direction;
  // player wants to go down
  if(nextTile === 2) {
    direction = 'down';
  }
  // player wants to go up
  if(nextTile === 3) {
    direction = 'up';
  }

  if(gameMode === 'endless') {
    if(direction === 'up') {
      // conditionally show a message based on floorNum
      showProgressMessage(floorNum);
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
      payload: { direction }
    });
  }
}

function showProgressMessage(floorNum) {
  let show = false;
  let message = null;
  // check if we should show a message
  switch(floorNum + 1) {
    case 2:
      show = true;
      message = (
        <GameTextDialog
          text1={`As you stare into the dark dungeon, it greets you with a cold chill... and a message...`}
          text2={`"JOURNEY ONE HUNDRED FLOORS AND ALL WILL BE GRANTED"`} />
      );
      break;
    case 20:
      show = true;
      message = (
        <GameTextDialog
          text1={`As you march onward, you notice the walls have a faint purple glow to them...`}
          text2={`"THE JOURNEY HAS JUST BEGUN"`} />
      );
      break;
    case 40:
      show = true;
      message = (
        <GameTextDialog
          text1={`As you nearly approach the halfway point, you feel confident and charge forward!`} />
      );
      break;
    case 60:
      show = true;
      message = (
        <GameTextDialog
          text1={`As you turn the corner, now well past the halfway point, you hear the shadowy voice...`}
          text2={`"WELL DONE ADVENTURER... ONLY A LITTLE FURTHER"`} />
      );
      break;
    case 80:
      show = true;
      message = (
        <GameTextDialog
          text1={`Now very close to the hundredth floor, you can feel the darkness pulling you towards it as it appears to swirl on the walls.`} />
      );
      break;
    case 100:
      show = true;
      message = (
        <GameTextDialog
          text1={`We didn't expect you to ACTUALLY make it this far.....`}
          text2={`"THE TRUTH IS... NOTHING... BUT OBLIVION LIES BEYOND THIS POINT..... WELCOME"`} />
      );
      break;
    default:
      return;
  }

  if(show) {
    store.dispatch({
      type: 'PAUSE',
      payload: { component: message }
    });
  }
}