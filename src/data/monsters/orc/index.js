// Credit: https://pipoya.itch.io/free-rpg-monster-pack
import OrcSprite from './orc.png';

const Orc = {
    hp: 20,
    maxHp: 20,
    attackValue: '5d4 + 8',
    defence: 4,
    dice: '1d6 + 2',
    exp: 44,
    type: 'orc',
    sprite: { WEST: OrcSprite, EAST: OrcSprite },
    ai: 'normal',
    originalAI: 'normal',
    direction: 'WEST',
    aiTurns: 0,
};

export default Orc;
