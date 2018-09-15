import { SPRITE_SIZE }     from '../../config/constants';
import getSurroundingTiles from '../../modules/get-surrounding-tiles';
import store               from '../../config/store';

export default function takeMonstersTurn() {
  // get the current monsters
  const { components } = store.getState().monsters;
  // find each monster
  Object.keys(components).forEach(monster => {
    // get monster id and position
    const { id, position } = components[monster].props.monster;
    // find the relative position
    let monsterPos = [(position[0] / SPRITE_SIZE), (position[1] / SPRITE_SIZE)];
    // get the tiles around the monster
    let nearTiles = getSurroundingTiles(monsterPos);
    // find the player's position
    let playerPos = store.getState().player.position;
    // make it relative
    playerPos = [playerPos[0] / SPRITE_SIZE, playerPos[1] / SPRITE_SIZE];
    // see if the player pos is in the monster's nearby tiles
    let foundPlayer = false;

    nearTiles.forEach(tile => {
      // if the player is in sight
      if(JSON.stringify(tile) === JSON.stringify(playerPos)) {
        foundPlayer = true;
      }
    });

    if(foundPlayer) {
      store.dispatch({
        type: 'REVEAL_MONSTER',
        payload: { id }
      })
    } else {
      store.dispatch({
        type: 'HIDE_MONSTER',
        payload: { id }
      })
    }
  });
}
