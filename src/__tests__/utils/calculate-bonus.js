import calculateBonus from '../../utils/calculate-bonus';

describe('calculateBonus tests:', () => {

  describe('when there is no weapon bonus ->', () => {

    test('returns input damage', () => {
      const playerDmg = 100;
      const monsterType = 'rat';
      const weaponBonus = undefined;

      const expected = playerDmg;

      expect(calculateBonus(playerDmg, monsterType, weaponBonus)).toBe(expected);
    });
  });

  describe('when there is a weapon bonus ->', () => {

    describe('when the monster type does NOT match the bonus ->', () => {

      test('returns input damage', () => {
        const playerDmg = 100;
        const monsterType = 'rat';

        const multiplyer = 2.5;
        const weaponBonus = `dragon::${multiplyer}`;

        const expected = playerDmg;

        expect(calculateBonus(playerDmg, monsterType, weaponBonus)).toBe(expected);
      });
    });

    describe('when the monster type DOES match the bonus ->', () => {

      test('returns input damage TIMES weapon bonus multiplier', () => {
        const playerDmg = 100;
        const monsterType = 'rat';

        const multiplyer = 2.5;
        const weaponBonus = `rat::${multiplyer}`;

        const expected = playerDmg * multiplyer;

        expect(calculateBonus(playerDmg, monsterType, weaponBonus)).toBe(expected);
      });
    });
  });
});