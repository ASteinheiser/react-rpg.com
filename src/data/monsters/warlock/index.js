import WarlockSprite from './warlock.png';

const Warlock = {
    hp: 32,
    maxHp: 32,
    attackValue: 34,
    defence: 3,
    dice: '3d6+4',
    exp: 320,
    type: 'warlock',
    sprite: WarlockSprite,
    ai: 'normal',
    aiTurns: 0,
};

export default Warlock;
