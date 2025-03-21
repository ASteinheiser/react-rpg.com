import calculateModifier from '../../utils/calculate-modifier';

describe('when you have an ability score of 20', () => {
    test('your modifier should be +5', () => {
        expect(calculateModifier(20)).toBe(5);
    });
});

describe('when you have an ability score of 10', () => {
    test('your modifier should be 0', () => {
        expect(calculateModifier(10)).toBe(0);
    });
});

describe('when you have an ability score of 0', () => {
    test('your modifier should be -5', () => {
        expect(calculateModifier(0)).toBe(-5);
    });
});
