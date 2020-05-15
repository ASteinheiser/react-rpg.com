import { BASE_MANA, MIN_MANA_BONUS } from '../config/constants';

export default function calculateMaxManaPool(level, intelligenceBonus) {
    let manaBonus =
        intelligenceBonus >= 0
            ? level * (intelligenceBonus + 2) * MIN_MANA_BONUS
            : level * MIN_MANA_BONUS - MIN_MANA_BONUS;
    return BASE_MANA + manaBonus;
}
