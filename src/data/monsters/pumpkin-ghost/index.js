// Credit: https://pipoya.itch.io/free-rpg-monster-pack
import PumpkinGhostSprite from './pumpkin-ghost.png';
import Pumpkin from '../../ammo/pumpkin';

const PumpkinGhost = {
    hp: 35,
    maxHp: 35,
    attackValue: '4d10 + 25',
    defence: 5,
    dice: '1d20+8',
    exp: 370,
    type: 'pumpkin ghost',
    sprite: { WEST: PumpkinGhostSprite, EAST: PumpkinGhostSprite },
    ai: 'ranged',
    originalAI: 'ranged',
    projectile: Pumpkin,
    direction: 'WEST',
    aiTurns: 0,
};

export default PumpkinGhost;
