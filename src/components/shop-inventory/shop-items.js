import items, {
    randomItemsT1,
    randomItemsT2,
    randomItemsT3,
    randomItemsT4,
} from '../../data/items';
import { TIER_2, TIER_3, TIER_4 } from '../../config/constants';

const purchaseOnlyT1 = [
    items.other.BackpackUpgrade,
    items.potions.HpPotion,
    items.potions.MpPotion,
];

const purchaseOnlyT2 = [
    ...purchaseOnlyT1,
    items.potions.GreatHpPotion,
    items.potions.GreatMpPotion,
];

const purchaseOnlyT3 = [
    ...purchaseOnlyT2,
    items.potions.MightyMpPotion,
    items.potions.MightyHpPotion,
];

const purchaseOnlyT4 = [
    ...purchaseOnlyT3,
    items.potions.DivineHpPotion,
    items.potions.DivineMpPotion,
];

// returns the correct tier of items depending on player level
export default function shopItems(level) {
    if (level < TIER_2) {
        return [...purchaseOnlyT1, ...randomItemsT1];
    }
    if (level < TIER_3) {
        return [...purchaseOnlyT2, ...randomItemsT2];
    }
    if (level < TIER_4) {
        return [...purchaseOnlyT3, ...randomItemsT3];
    }
    return [...purchaseOnlyT4, ...randomItemsT4];
}
