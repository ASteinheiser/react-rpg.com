import {
    MIN_PRICE_PERCENT,
    MID_PRICE_PERCENT,
    MAX_PRICE_PERCENT,
} from '../config/constants';

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
