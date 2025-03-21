import {
    randomItemsT1,
    randomItemsT2,
    randomItemsT3,
    randomItemsT4,
} from '../../../../data/items';
import { TIER_2, TIER_3, TIER_4 } from '../../../../config/constants';
// returns a set of random items depending on player level
export default function randomItem(playerLv) {
    if (playerLv < TIER_2) {
        const randomNumber = Math.floor(Math.random() * randomItemsT1.length);
        return randomItemsT1[randomNumber];
    }
    if (playerLv < TIER_3) {
        const randomNumber = Math.floor(Math.random() * randomItemsT2.length);
        return randomItemsT2[randomNumber];
    }
    if (playerLv < TIER_4) {
        const randomNumber = Math.floor(Math.random() * randomItemsT3.length);
        return randomItemsT3[randomNumber];
    } else {
        const randomNumber = Math.floor(Math.random() * randomItemsT4.length);
        return randomItemsT4[randomNumber];
    }
}
