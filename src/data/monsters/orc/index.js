import OrcSprite from './orc.png';

const Orc = {
    hp: 20,
    maxHp: 20,
    attackValue: '2d6 + 6',
    defence: 4,
    dice: '1d6 + 2',
    exp: 44,
    type: 'orc',
    sprite: { WEST: OrcSprite, EAST: OrcSprite },
    ai: 'normal',
    originalAI: 'normal',
    direction: 'WEST',
    aiTurns: 0,
};

export default Orc;
