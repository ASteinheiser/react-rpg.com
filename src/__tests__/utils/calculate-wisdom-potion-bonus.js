import calculateWisdomPotionBonus from '../../utils/calculate-wisdom-potion-bonus';

describe('When your wisdom modifier is +5', () => {
    test('your potion bonus for a potion with a base restore of 10', () => {
        expect(calculateWisdomPotionBonus(10, 5)).toBe(42);
    });
});

describe('When your wisdom modifier is <= 0', () => {
    test('your potion bonus for a potion with a base restore of 10 should be 10 for modifier of 0', () => {
        expect(calculateWisdomPotionBonus(10, 0)).toBe(10);
    });
    test('your potion bonus for a potion with a base restore of 10 should be 10 for modifier of -5', () => {
        expect(calculateWisdomPotionBonus(10, -5)).toBe(10);
    });
});
