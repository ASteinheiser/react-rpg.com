import { randomItemsT1, randomItemsT2 } from '../../../../data/items';
import { TIER_2 } from '../../../../config/constants';
// returns a set of random items depending on player level
export default function randomItem(playerLv) {
  if(playerLv < TIER_2) {
    const randomNumber = Math.floor(Math.random() * randomItemsT1.length);
    return randomItemsT1[randomNumber];
  }
  else {
    const randomNumber = Math.floor(Math.random() * randomItemsT2.length);
    return randomItemsT2[randomNumber];
  }
}
