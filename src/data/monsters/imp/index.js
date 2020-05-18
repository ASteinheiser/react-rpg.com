import ImpSprite from './imp.png';

const Imp = {
    hp: 30,
    maxHp: 30,
    attackValue: 26,
    defence: 2,
    dice: '3d4 + 4',
    exp: 160,
    type: 'imp',
    sprite: ImpSprite,
    ai: 'normal',
    aiTurns: 0,
};

export default Imp;
