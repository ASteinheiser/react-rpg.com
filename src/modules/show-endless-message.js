import React from 'react';

import GameTextDialog from '../components/game-text-dialog';
import store          from '../config/store';

export default function showEndlessMessage(floorNum) {
  let message = false;
  // check if we should show a message
  switch(floorNum + 1) {
    case 20:
      message = (
        <GameTextDialog
          text1={`As you march onward, you notice the walls have a faint purple glow to them...`}
          text2={`"THE JOURNEY HAS JUST BEGUN"`} />
      );
      break;
    case 40:
      message = (
        <GameTextDialog
          text1={`As you nearly approach the halfway point, you feel confident and charge forward!`} />
      );
      break;
    case 60:
      message = (
        <GameTextDialog
          text1={`As you turn the corner, now well past the halfway point, you hear the shadowy voice...`}
          text2={`"WELL DONE ADVENTURER... ONLY A LITTLE FURTHER"`} />
      );
      break;
    case 80:
      message = (
        <GameTextDialog
          text1={`Now very close to the hundredth floor, you can feel the darkness pulling you towards it as it appears to swirl on the walls.`} />
      );
      break;
    case 100:
      message = (
        <GameTextDialog
          text1={`We didn't expect you to ACTUALLY make it this far.....`}
          text2={`"THE TRUTH IS... NOTHING... BUT OBLIVION LIES BEYOND THIS POINT..... WELCOME"`} />
      );
      break;
    default:
      return;
  }

  if(message) {
    store.dispatch({
      type: 'PAUSE',
      payload: { component: message }
    });
  }
}