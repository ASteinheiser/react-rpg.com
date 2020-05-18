import PumpkinGhostSprite from './pumpkin-ghost.png';

const PumpkinGhost = {
    hp: 35,
    maxHp: 35,
    attackValue: 40,
    defence: 5,
    dice: '1d20+8',
    exp: 370,
    type: 'pumpkin ghost',
    sprite: PumpkinGhostSprite,
    ai: 'normal',
    aiTurns: 0,
};

export default PumpkinGhost;
