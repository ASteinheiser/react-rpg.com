import OrcSprite from './orc.png';

const Orc = {
    hp: 20,
    maxHp: 20,
    attackValue: 20,
    defence: 4,
    dice: '1d6 + 2',
    exp: 44,
    type: 'orc',
    sprite: OrcSprite,
    ai: 'normal',
    aiTurns: 0,
};

export default Orc;
