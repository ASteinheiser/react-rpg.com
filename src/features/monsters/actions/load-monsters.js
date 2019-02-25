import generateMonsters from '../../map/random-map-gen/generate-monsters';

export default function loadMonsters() {
  return (dispatch, getState) => {

    const { world, monsters, player, stats } = getState();
    const { gameMode, currentMap, randomMaps, floorNum, storyMaps } = world;

    if(!monsters.components[currentMap]) {
      // if it's endless mode and we don't have monsters for the current map
      if(gameMode === 'endless') {
        // let's generate some monsters and set them!
        dispatch({
          type: 'ADD_MONSTERS',
          payload: {
            monsters: generateMonsters(floorNum, randomMaps[floorNum - 1].tiles, player.position, stats.level),
            map: currentMap
          }
        });
      } // load monsters for the story map
      else {
        dispatch({
          type: 'ADD_MONSTERS',
          payload: {
            monsters: storyMaps[currentMap].monsters,
            map: currentMap
          }
        });
      }
    }
  };
}