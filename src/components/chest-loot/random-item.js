import { randomItemsT1, randomItemsT2 } from '../../data/items';
// returns a set of random items depending on player level
export default function randomItem(playerLv) {
  if(playerLv < 10) {
    let randomNumber = Math.floor(Math.random() * randomItemsT1.length);
    return randomItemsT1[randomNumber];
  } else {
    let randomNumber = Math.floor(Math.random() * randomItemsT2.length);
    return randomItemsT2[randomNumber];
  }
}
