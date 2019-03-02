import { SPRITE_SIZE } from '../config/constants';

export default function getNextTile(world, newPos) {

  const { gameMode, storyMaps, currentMap, randomMaps, floorNum } = world;

  let currentMapData;
  if(gameMode === 'story') {
    currentMapData = storyMaps[currentMap];
  }
  else {
    currentMapData = randomMaps[floorNum - 1];
  }

  const { tiles } = currentMapData;
  const y = newPos[1] / SPRITE_SIZE;
  const x = newPos[0] / SPRITE_SIZE;
  // safely return the tiles value, otherwise return a wall
  return (tiles[y] && tiles[y][x]) ? tiles[y][x].value : 5;
}