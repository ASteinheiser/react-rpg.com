import GhostSprite from './ghost.png';

const Ghost = {
    hp: 20,
    maxHp: 20,
    attackValue: '1d8 + 4',
    defence: 4,
    dice: '1d8',
    exp: 80,
    type: 'ghost',
    sprite: GhostSprite,
    ai: 'normal',
    aiTurns: 0,
};

export default Ghost;
