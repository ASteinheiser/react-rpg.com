import { BASE_HEALTH, MIN_HEALTH_BONUS } from '../config/constants';

/**
 * Given the players level and constitution modifier, determine their max health
 *
 * @param {*} level The current level of the player
 * @param {*} constitutionModifier The modifier the player has for constitution
 */
export default function calculateMaxHpPool(level, constitutionModifier) {
    const healthBonus =
        constitutionModifier >= 0
            ? level * (5 + constitutionModifier)
            : level * MIN_HEALTH_BONUS - MIN_HEALTH_BONUS;
    return BASE_HEALTH + healthBonus;
}
