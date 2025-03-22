import { BASE_MANA, MIN_MANA_BONUS } from '../config/constants';

/**
 * Determine the players maximum mana pool based on their level and intelligence.
 *
 * @param {*} level The current level of the player
 * @param {*} intelligenceModifier The modifier the player has for intelligence
 */
export default function calculateMaxManaPool(level, intelligenceModifier) {
    const manaBonus =
        intelligenceModifier >= 0
            ? level * (intelligenceModifier + 2) * MIN_MANA_BONUS
            : level * MIN_MANA_BONUS - MIN_MANA_BONUS;
    return BASE_MANA + manaBonus;
}
