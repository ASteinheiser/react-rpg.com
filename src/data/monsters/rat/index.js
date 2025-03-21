// Credit: https://pipoya.itch.io/free-rpg-monster-pack
import RatSprite from './rat.png';
import RatFloppedSprite from './rat-flopped.png';

const Rat = {
    hp: 6,
    maxHp: 6,
    attackValue: '1d4',
    defence: 0,
    dice: '1d4',
    exp: 8,
    type: 'rat',
    sprite: { WEST: RatSprite, EAST: RatFloppedSprite },
    ai: 'normal',
    originalAI: 'normal',
    direction: 'WEST',
    aiTurns: 0,
};

export default Rat;
