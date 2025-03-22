/**
 * Determine the modifier that an ability has based on its ability score.
 *
 * @param {*} abilityScore The ability score value
 */
export default function calculateModifier(abilityScore) {
    return Math.floor((abilityScore - 10) / 2);
}
