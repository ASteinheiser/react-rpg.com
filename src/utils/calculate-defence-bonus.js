/**
 * Determine the defence bonus that the player's dexterity provides.
 *
 * @param {*} dexterityModifier The modifier the player has for dexterity
 */
export default function calculateDefenceBonus(dexterityModifier) {
    return dexterityModifier >= 0 ? dexterityModifier + 1 : 0;
}
