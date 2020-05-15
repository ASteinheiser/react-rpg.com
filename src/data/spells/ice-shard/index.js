// Credit: https://kvsr.itch.io/pixelarteffectfx017
import IceShardSprite from './IceShard.png';
import IceShardImage from './IceShard-image.png';
import { SIGHT_RADIUS, AI_CHANGE_TURNS } from '../../../config/constants';

const IceShard = {
    name: 'Ice Shard',
    type: 'spell',
    target: 'enemy',
    kind: 'combat',
    range: SIGHT_RADIUS,
    damage: '1d4',
    manaCost: 12,
    size: { width: 40, height: 40, total: 200 },
    image: IceShardImage,
    sprite: IceShardSprite,
    description: 'Just chill out while I try to figure out what to do!',
    unlockLevel: 5,
    effects: {
        changeAI: { to: 'frozen', turns: AI_CHANGE_TURNS, effect: 'freeze' },
    },
};

export default IceShard;
