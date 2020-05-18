import WaterSpiritSprite from './water-spirit.png';

const WaterSpirit = {
    hp: 10,
    maxHp: 10,
    attackValue: '1d4 + 1',
    defence: 1,
    dice: '1d4',
    exp: 28,
    type: 'water spirit',
    sprite: WaterSpiritSprite,
    ai: 'normal',
    aiTurns: 0,
};

export default WaterSpirit;
