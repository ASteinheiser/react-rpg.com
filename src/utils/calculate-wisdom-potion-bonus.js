export default function calculateWisdomPotionBonus(baseAmount, wisdomBonus) {
    return baseAmount + (wisdomBonus > 0 ? 2 ** wisdomBonus : 0);
}
