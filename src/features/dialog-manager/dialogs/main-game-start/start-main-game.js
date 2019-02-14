import exploreTiles  from '../../../../features/player/actions/explore-tiles';
import { START_MAP } from '../../../../config/constants';

export default function startMainGame() {
  return (dispatch, getState) => {

    dispatch({
      type: 'PAUSE',
      payload: {
        pause: true,
        gameInstructions: true
      }
    });

    dispatch({
      type: 'LOAD_STORY_MAPS',
      payload: {}
    });

    // this needs to happen before add tiles, explore tiles, or add monsters
    dispatch({
      type: 'SET_START_MAP',
      payload: {
        startMap: START_MAP,
        gameMode: 'story'
      }
    });

    dispatch({
      type: 'ADD_TILES',
      payload: {
        tiles: getState().world.storyMaps[START_MAP].tiles
      }
    });

    dispatch(exploreTiles(getState().player.position));

    dispatch({
      type: 'ADD_MONSTERS',
      payload: {
        monsters: getState().world.storyMaps[START_MAP].monsters,
        map: START_MAP
      }
    });
  }
}
