import FungiBulbSprite from './fungi-bulb.png';

const FungiBulb = {
    hp: 16,
    maxHp: 16,
    attackValue: '2d10 + 7',
    defence: 2,
    dice: '1d6',
    exp: 38,
    type: 'fungi bulb',
    sprite: FungiBulbSprite,
    ai: 'normal',
    aiTurns: 0,
};

export default FungiBulb;
