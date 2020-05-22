// Credit: https://pipoya.itch.io/free-rpg-monster-pack
import WaterSpiritSprite from './water-spirit.png';
import IceShard from '../../spells/ice-shard';

const WaterSpirit = {
    hp: 10,
    maxHp: 10,
    attackValue: '2d4 + 6',
    defence: 1,
    dice: '1d4',
    exp: 28,
    type: 'water spirit',
    sprite: { WEST: WaterSpiritSprite, EAST: WaterSpiritSprite },
    ai: 'magical',
    originalAI: 'magical',
    projectile: IceShard,
    direction: 'WEST',
    aiTurns: 0,
};

export default WaterSpirit;
