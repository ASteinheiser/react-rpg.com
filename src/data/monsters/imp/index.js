import ImpSprite from './imp.png';

const Imp = {
    hp: 40,
    maxHp: 40,
    attackValue: 6,
    defence: 2,
    dice: '2d4 + 2',
    exp: 150,
    type: 'imp',
    sprite: ImpSprite,
    ai: 'normal',
    aiTurns: 0,
};

export default Imp;
