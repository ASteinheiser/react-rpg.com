import CerberusSprite from './cerberus.png';

const Cerberus = {
    hp: 100,
    maxHp: 100,
    attackValue: 48,
    defence: 12,
    dice: '3d20',
    exp: 1000,
    type: 'cerberus',
    sprite: CerberusSprite,
    ai: 'normal',
    aiTurns: 0,
};

export default Cerberus;
