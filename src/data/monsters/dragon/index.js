import DragonSprite from './dragon.png';
import DragonFloppedSprite from './dragon-flopped.png';
import Mend from '../../spells/mend';

const Dragon = {
    hp: 60,
    maxHp: 60,
    attackValue: '2d20 + 20',
    defence: 8,
    dice: '2d20',
    exp: 400,
    type: 'dragon',
    sprite: { WEST: DragonSprite, EAST: DragonFloppedSprite },
    ai: 'healer',
    originalAI: 'healer',
    projectile: Mend,
    direction: 'WEST',
    aiTurns: 0,
};

export default Dragon;
