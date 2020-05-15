import OrcSprite from './orc.png';

const Orc = {
    hp: 20,
    maxHp: 20,
    attackValue: 15,
    defence: 4,
    dice: '1d6 + 2',
    exp: 40,
    type: 'orc',
    sprite: OrcSprite,
    ai: 'normal',
    aiTurns: 0,
};

export default Orc;
