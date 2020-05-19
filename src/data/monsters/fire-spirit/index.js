import FireSpiritSprite from './fire-spirit.png';
import Fireball from '../../spells/fireball';

const FireSpirit = {
    hp: 30,
    maxHp: 30,
    attackValue: '1d20 + 13',
    defence: 2,
    dice: '3d4',
    exp: 180,
    type: 'fire spirit',
    sprite: { WEST: FireSpiritSprite, EAST: FireSpiritSprite },
    ai: 'magical',
    originalAI: 'magical',
    projectile: Fireball,
    direction: 'WEST',
    aiTurns: 0,
};

export default FireSpirit;
