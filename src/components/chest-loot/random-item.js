import { randomItems } from '../../data/items';

export default function randomItem() {
  let randomNumber = Math.floor(Math.random() * randomItems.length);
  return randomItems[randomNumber];
}
