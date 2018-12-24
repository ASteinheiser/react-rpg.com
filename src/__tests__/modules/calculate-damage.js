import calculateDamage from '../../modules/calculate-damage';

describe('basic calculateDamage tests:', () => {

  test('returns 0 when dmg = 0, def = 0', () => {
    const dmg = 0;
    const def = 0;
    expect(calculateDamage(dmg, def)).toEqual(0);
  });

  test('returns 0 when dmg < 0, def = 0', () => {
    const dmg = -10;
    const def = 0;
    expect(calculateDamage(dmg, def)).toEqual(0);
  });

  test('returns 0 when dmg = 0, def < 0', () => {
    const dmg = 0;
    const def = -10;
    expect(calculateDamage(dmg, def)).toEqual(0);
  });

  test('returns 100 when dmg = 100, def = 0', () => {
    const dmg = 100;
    const def = 0;
    expect(calculateDamage(dmg, def)).toEqual(100);
  });

  test('returns 100 when dmg = 100, def < 0', () => {
    const dmg = 100;
    const def = -10;
    expect(calculateDamage(dmg, def)).toEqual(100);
  });

  test('returns 34 when dmg = 100, def = 200', () => {
    const dmg = 100;
    const def = 200;
    expect(calculateDamage(dmg, def)).toEqual(34);
  });

  test('returns 50 when dmg = 100, def = 100', () => {
    const dmg = 100;
    const def = 100;
    expect(calculateDamage(dmg, def)).toEqual(50);
  });

  test('returns 67 when dmg = 100, def = 50', () => {
    const dmg = 100;
    const def = 50;
    expect(calculateDamage(dmg, def)).toEqual(67);
  });
});