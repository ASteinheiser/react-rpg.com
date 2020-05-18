import GhostSprite from './ghost.png';

const Ghost = {
    hp: 16,
    maxHp: 16,
    attackValue: 22,
    defence: 4,
    dice: '1d8',
    exp: 80,
    type: 'ghost',
    sprite: GhostSprite,
    ai: 'normal',
    aiTurns: 0,
};

export default Ghost;
