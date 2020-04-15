export default function calculateMaxManaPool(intelligenceBonus) {
    return intelligenceBonus >= 0 ? (intelligenceBonus + 1) * 10 : 0;
}
