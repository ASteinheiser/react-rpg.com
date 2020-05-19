import BlackOrcSprite from './black-orc.png';

const BlackOrc = {
    hp: 55,
    maxHp: 55,
    attackValue: '1d20 + 20',
    defence: 5,
    dice: '3d8',
    exp: 280,
    type: 'black orc',
    sprite: { WEST: BlackOrcSprite, EAST: BlackOrcSprite },
    ai: 'normal',
    originalAI: 'normal',
    direction: 'WEST',
    aiTurns: 0,
};

export default BlackOrc;
