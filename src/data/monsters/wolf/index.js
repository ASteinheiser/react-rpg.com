import WolfSprite from './wolf.png';

const Wolf = {
    hp: 10,
    maxHp: 10,
    attackValue: '1d4 + 2',
    defence: 1,
    dice: '1d4 + 1',
    exp: 22,
    type: 'wolf',
    sprite: WolfSprite,
    ai: 'normal',
    aiTurns: 0,
};

export default Wolf;
