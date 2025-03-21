// Credit: https://pipoya.itch.io/free-rpg-monster-pack
import WarlockSprite from './warlock.png';
import Fireball from '../../spells/fireball';

const Warlock = {
    hp: 30,
    maxHp: 30,
    attackValue: '2d20 + 20',
    defence: 2,
    dice: '3d6+4',
    exp: 320,
    type: 'warlock',
    sprite: { WEST: WarlockSprite, EAST: WarlockSprite },
    ai: 'magical',
    originalAI: 'magical',
    projectile: Fireball,
    direction: 'WEST',
    aiTurns: 0,
};

export default Warlock;
