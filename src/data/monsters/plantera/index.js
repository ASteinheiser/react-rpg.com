// Credit: https://pipoya.itch.io/free-rpg-monster-pack
import PlanteraSprite from './plantera.png';
import Pea from '../../ammo/pea';

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
    projectile: Pea,
    direction: 'WEST',
    aiTurns: 0,
};

export default Plantera;
