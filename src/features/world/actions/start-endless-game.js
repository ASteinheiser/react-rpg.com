import items            from '../../../data/items';
import generateMap      from '../../map/random-map-gen/generate-map';
import generateMonsters from '../../map/random-map-gen/generate-monsters';
import exploreTiles     from '../../../features/player/actions/explore-tiles';
import uuidv4           from '../../../utils/uuid-v4';

export default function startEndlessGame() {
  return (dispatch, getState) => {

    const { player, stats } = getState();
    const floorNum = 1;
    // generate a random map and id
    const randomMap = generateMap(player.position, floorNum);
    const mapId = uuidv4();

    dispatch({
      type: 'PAUSE',
      payload: {
        pause: true,
        gameText: {
          title: `As you stare into the dark dungeon, it greets you with a cold chill... and a message...`,
          body: `"JOURNEY ONE HUNDRED FLOORS AND ALL WILL BE GRANTED"`
        }
      }
    });

    dispatch({
      type: 'ADD_RANDOM_MAP',
      payload: {
        tiles: randomMap,
        id: mapId
      }
    });

    dispatch({
      type: 'SET_START_MAP',
      payload: {
        startMap: mapId,
        gameMode: 'endless',
        floorNum
      }
    });

    dispatch(exploreTiles(player.position));

    dispatch({
      type: 'ADD_MONSTERS',
      payload: {
        monsters: generateMonsters(floorNum, randomMap, player.position, stats.level),
        map: mapId
      }
    });

    dispatch({
      type: 'GET_ITEM',
      payload: items.weapons.RustySword
    });

    dispatch({
      type: 'EQUIP_ITEM',
      payload: getState().inventory.items[0]
    });
  };
}
