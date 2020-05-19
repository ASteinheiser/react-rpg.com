import GoblinSprite from './goblin.png';

const Goblin = {
    hp: 14,
    maxHp: 14,
    attackValue: '2d6 + 3',
    defence: 3,
    dice: '1d6',
    exp: 30,
    type: 'goblin',
    sprite: { WEST: GoblinSprite, EAST: GoblinSprite },
    ai: 'normal',
    originalAI: 'normal',
    direction: 'WEST',
    aiTurns: 0,
};

export default Goblin;
