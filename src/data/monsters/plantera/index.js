import PlanteraSprite from './plantera.png';
import Stone from '../../ammo/stone';

const Plantera = {
    hp: 40,
    maxHp: 40,
    attackValue: '3d20 + 21',
    defence: 4,
    dice: '3d8+2',
    exp: 330,
    type: 'Plantera',
    sprite: { WEST: PlanteraSprite, EAST: PlanteraSprite },
    ai: 'ranged',
    originalAI: 'ranged',
    projectile: Stone,
    direction: 'WEST',
    aiTurns: 0,
};

export default Plantera;
