// Credit: https://kvsr.itch.io/pixelarteffectfx017
import VoidSprite from './Void.png';
import VoidImage from './Void-image.png';
import { SIGHT_RADIUS, AI_CHANGE_TURNS } from '../../../config/constants';

const Void = {
    name: 'Void',
    type: 'spell',
    target: 'enemy',
    kind: 'combat',
    range: SIGHT_RADIUS,
    damage: '2d6',
    manaCost: 27,
    size: { width: 40, height: 40, total: 200 },
    image: VoidImage,
    sprite: VoidSprite,
    description: 'This is not the value you were looking for...',
    unlockLevel: 13,
    effects: {
        changeAI: {
            to: 'scared',
            turns: AI_CHANGE_TURNS,
            effect: 'scare',
        },
    },
};

export default Void;
