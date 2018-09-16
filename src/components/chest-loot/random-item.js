import { allItems } from '../../data/items';

export default function randomItem() {
  let randomNumber = Math.floor(Math.random() * allItems.length);
  return allItems[randomNumber];
}
