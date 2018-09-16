import { SPRITE_SIZE } from '../../config/constants';
import store           from '../../config/store';

export default function takeMonstersTurn() {
  // get the current monsters
  const { components } = store.getState().monsters;
  const { sightBox } = store.getState().map;
  // find each monster
  Object.keys(components).forEach(monster => {
    // get monster id and position
    const { id, position } = components[monster].props.monster;
    // find the relative position
    let monsterPos = [(position[1] / SPRITE_SIZE), (position[0] / SPRITE_SIZE)];

    let monsterVisible = false;
    // look through each current sight box tile
    sightBox.forEach(tile => {
      // if the monster is in sight
      if(JSON.stringify(tile) === JSON.stringify(monsterPos)) {
        monsterVisible = true;
      }
    });

    if(monsterVisible) {
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
