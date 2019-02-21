import { START_MAP } from '../../../config/constants';

export default function showFirstStoryMessage() {
  return (dispatch, getState) => {

    const { message } = getState().world.storyMaps[START_MAP];

    dispatch({
      type: 'PAUSE',
      payload: {
        pause: true,
        gameText: {
          title: message.title,
          body: message.body
        }
      }
    });
  };
}