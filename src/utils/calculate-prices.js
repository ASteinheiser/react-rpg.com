import {
    MIN_PRICE_PERCENT,
    MID_PRICE_PERCENT,
    MAX_PRICE_PERCENT,
} from '../config/constants';

/**
 * Determine the buy and sell prices for the player based on the base price of the item,
 * and their current charisma.
 *
 * @param {*} basePrice The base price of the item
 * @param {*} charismaModifier The players charisma modifier
 */
export default function calculatePrices(basePrice, charismaModifier) {
    const buyPriceStep = (MID_PRICE_PERCENT - MAX_PRICE_PERCENT) / 10;
    const sellPriceStep = (MID_PRICE_PERCENT - MIN_PRICE_PERCENT) / 10;
    const modifierStep = charismaModifier + 5;

    return {
        sellPrice: Math.round(
            (modifierStep * sellPriceStep + MIN_PRICE_PERCENT) * basePrice
        ),
        buyPrice: Math.round(
            (modifierStep * buyPriceStep + MAX_PRICE_PERCENT) * basePrice
        ),
    };
}
