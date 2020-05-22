// Credit: https://pipoya.itch.io/free-rpg-monster-pack
import GhostSprite from './ghost.png';
import LightningBolt from '../../spells/lightning-bolt';

const Ghost = {
    hp: 20,
    maxHp: 20,
    attackValue: '3d6 + 5',
    defence: 4,
    dice: '1d8',
    exp: 80,
    type: 'ghost',
    sprite: { WEST: GhostSprite, EAST: GhostSprite },
    ai: 'magical',
    originalAI: 'magical',
    projectile: LightningBolt,
    direction: 'WEST',
    aiTurns: 0,
};

export default Ghost;
