import BatSprite from './bat.png';

const Bat = {
    hp: 10,
    maxHp: 10,
    attackValue: 4,
    defence: 0,
    dice: '1d4',
    exp: 14,
    type: 'bat',
    sprite: BatSprite,
    ai: 'normal',
    aiTurns: 0,
};

export default Bat;
