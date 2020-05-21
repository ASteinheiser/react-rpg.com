// Credit: https://kvsr.itch.io/pixelarteffectfx017
import BlizzardSprite from './Blizzard.png';
import BlizzardImage from './Blizzard-image.png';
import { SIGHT_RADIUS, AI_CHANGE_TURNS } from '../../../config/constants';

const Blizzard = {
    name: 'Blizzard',
    type: 'spell',
    target: 'enemy',
    kind: 'combat',
    range: SIGHT_RADIUS,
    damage: '2d6',
    manaCost: 52,
    size: { width: 40, height: 40, total: 200 },
    image: BlizzardImage,
    sprite: BlizzardSprite,
    description: 'I told you to chill out! You should have listened...',
    unlockLevel: 17,
    effects: {
        changeAI: {
            to: 'frozen',
            turns: AI_CHANGE_TURNS * 2,
            effect: 'freeze',
        },
    },
};

export default Blizzard;
