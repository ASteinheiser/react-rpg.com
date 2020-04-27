import { BASE_MANA, MIN_MANA_BONUS } from '../config/constants';

export default function calculateMaxManaPool(level, intelligenceBonus) {
    return (
        BASE_MANA +
        (level - 1) *
            (intelligenceBonus >= 0
                ? (intelligenceBonus + 2) * MIN_MANA_BONUS
                : MIN_MANA_BONUS)
    );
}
