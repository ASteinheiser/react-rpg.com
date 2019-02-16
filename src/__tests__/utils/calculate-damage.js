import calculateDamage from '../../utils/calculate-damage';

describe('basic calculateDamage tests:', () => {

  test('returns 0 when dmg = 0, def = 0', () => {
    const dmg = 0;
    const def = 0;
    const expected = 0;

    expect(calculateDamage(dmg, def)).toEqual(expected);
  });

  test('returns 0 when dmg < 0, def = 0', () => {
    const dmg = -10;
    const def = 0;
    const expected = 0;

    expect(calculateDamage(dmg, def)).toEqual(expected);
  });

  test('returns 0 when dmg = 0, def < 0', () => {
    const dmg = 0;
    const def = -10;
    const expected = 0;

    expect(calculateDamage(dmg, def)).toEqual(expected);
  });

  test('returns 100 when dmg = 100, def = 0', () => {
    const dmg = 100;
    const def = 0;
    const expected = 100;

    expect(calculateDamage(dmg, def)).toEqual(expected);
  });

  test('returns 100 when dmg = 100, def < 0', () => {
    const dmg = 100;
    const def = -10;
    const expected = 100;

    expect(calculateDamage(dmg, def)).toEqual(expected);
  });

  test('returns 34 when dmg = 100, def = 200', () => {
    const dmg = 100;
    const def = 200;
    const expected = 34;

    expect(calculateDamage(dmg, def)).toEqual(expected);
  });

  test('returns 50 when dmg = 100, def = 100', () => {
    const dmg = 100;
    const def = 100;
    const expected = 50;

    expect(calculateDamage(dmg, def)).toEqual(expected);
  });

  test('returns 67 when dmg = 100, def = 50', () => {
    const dmg = 100;
    const def = 50;
    const expected = 67;

    expect(calculateDamage(dmg, def)).toEqual(expected);
  });
});