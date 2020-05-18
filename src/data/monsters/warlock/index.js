import WarlockSprite from './warlock.png';

const Warlock = {
    hp: 30,
    maxHp: 30,
    attackValue: '2d10 + 20',
    defence: 2,
    dice: '3d6+4',
    exp: 320,
    type: 'warlock',
    sprite: WarlockSprite,
    ai: 'normal',
    aiTurns: 0,
};

export default Warlock;
