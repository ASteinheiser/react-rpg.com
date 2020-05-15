import GoblinSprite from './goblin.png';

const Goblin = {
    hp: 14,
    maxHp: 14,
    attackValue: 12,
    defence: 3,
    dice: '1d6',
    exp: 25,
    type: 'goblin',
    sprite: GoblinSprite,
    ai: 'normal',
    aiTurns: 0,
};

export default Goblin;
