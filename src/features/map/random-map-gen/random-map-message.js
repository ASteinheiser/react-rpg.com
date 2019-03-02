
export default function randomMapMessage(floorNum) {
  return dispatch => {

    let message = false;
    // check if we should show a message
    switch(floorNum + 1) {
      case 20:
        message = {
          title: `As you march onward, you notice the walls have a faint purple glow to them...`,
          body: `"THE JOURNEY HAS JUST BEGUN"`
        };
        break;
      case 40:
        message = {
          title: `As you nearly approach the halfway point, you feel confident and charge forward!`,
          body: ''
        };
        break;
      case 60:
        message = {
          title: `As you turn the corner, now well past the halfway point, you hear the shadowy voice...`,
          body: `"WELL DONE ADVENTURER... ONLY A LITTLE FURTHER"`
        };
        break;
      case 80:
        message = {
          title: `Now very close to the hundredth floor, you can feel the darkness pulling you towards it as it appears to swirl on the walls.`,
          body: ''
        };
        break;
      case 100:
        message = {
          title: `We didn't expect you to ACTUALLY make it this far.....`,
          body: `"THE TRUTH IS... NOTHING... BUT OBLIVION LIES BEYOND THIS POINT..... WELCOME"`
        };
        break;
      default:
        return;
    }

    if(message) {
      dispatch({
        type: 'PAUSE',
        payload: {
          pause: true,
          gameText: message
        }
      });
    }
  };
}