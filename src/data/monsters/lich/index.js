import LichSprite from './lich.png';

const Lich = {
    hp: 100,
    maxHp: 100,
    attackValue: '3d20 + 10',
    defence: 12,
    dice: '1d20 + 10',
    exp: 1000,
    type: 'lich',
    sprite: LichSprite,
    ai: 'normal',
    aiTurns: 0,
};

export default Lich;
