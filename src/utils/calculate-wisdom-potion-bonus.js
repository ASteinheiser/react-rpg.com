/**
 * Determine the amount that a potion will heal (hp)/restore (mp) the player
 * based on the base amount the potion provides, and the players wisdom.
 *
 * @param {*} baseAmount The base amount that the potion would heal/restore
 * @param {*} wisdomModifier The modifier the player has for Wisdom
 */
export default function calculateWisdomPotionBonus(baseAmount, wisdomModifier) {
    return baseAmount + (wisdomModifier > 0 ? 2 ** wisdomModifier : 0);
}
