export default function calculateDefenceBonus(dexterity_modifier) {
    return dexterity_modifier >= 0 ? dexterity_modifier + 1 : 0;
}
