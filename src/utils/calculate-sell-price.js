import calculateBuyPrice from './calculate-buy-price';

// Calculates sell price of an item based on the base price and the charisma
// modifier of the player
// Sell price is constrained to the buy price (cannot exceed it)
export default function calculateSellPrice(basePrice, charismaModifier) {
    const sellPrice = Math.ceil(basePrice * (0.5 + charismaModifier / 10));
    const buyPrice = calculateBuyPrice(basePrice, charismaModifier);
    return sellPrice > buyPrice ? buyPrice : sellPrice;
}
