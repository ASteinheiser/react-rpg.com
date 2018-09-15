import { radiusTiles } from '../player/explore-tiles';
import store           from '../../config/store';

export default function takeMonstersTurn() {
  // get the current monsters
  const { components } = store.getState().monsters;

  Object.keys(components).forEach(monster => {
    console.log(components[monster]);
  });
}
