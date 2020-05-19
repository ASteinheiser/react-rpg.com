import CerberusSprite from './cerberus.png';

const Cerberus = {
    hp: 100,
    maxHp: 100,
    attackValue: '4d20 + 20',
    defence: 12,
    dice: '3d20',
    exp: 1000,
    type: 'cerberus',
    sprite: { WEST: CerberusSprite, EAST: CerberusSprite },
    ai: 'boss',
    originalAI: 'boss',
    direction: 'WEST',
    aiTurns: 0,
};

export default Cerberus;
