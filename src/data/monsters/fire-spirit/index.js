import FireSpiritSprite from './fire-spirit.png';

const FireSpirit = {
    hp: 30,
    maxHp: 30,
    attackValue: '1d20 + 13',
    defence: 2,
    dice: '3d4',
    exp: 180,
    type: 'fire spirit',
    sprite: FireSpiritSprite,
    ai: 'normal',
    aiTurns: 0,
};

export default FireSpirit;
