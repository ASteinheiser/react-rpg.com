import { SPRITE_SIZE }     from '../../config/constants';
import getSurroundingTiles from '../../modules/get-surrounding-tiles';
import store               from '../../config/store';

export default function takeMonstersTurn() {
  // get the current monsters
  const { components } = store.getState().monsters;
  // find each monster
  Object.keys(components).forEach(monster => {
    let { position } = components[monster].props.monster;
    // find the relative position
    let monsterPos = [(position[1] / SPRITE_SIZE), (position[0] / SPRITE_SIZE)];
    // get the tiles around the monster
    let nearTiles = getSurroundingTiles(monsterPos);

    console.log(nearTiles);
  });
}
