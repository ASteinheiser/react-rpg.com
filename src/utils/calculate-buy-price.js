// Calculates the buy price of an item based on the base price and the charisma
// modifier of the player
export default function calculateBuyPrice(basePrice, charismaModifier) {
    return Math.ceil(basePrice * (1.0 - charismaModifier / 10));
}
