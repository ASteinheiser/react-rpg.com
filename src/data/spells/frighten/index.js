// Credit: https://kvsr.itch.io/pixelarteffectfx017
import FrightenSprite from './Frighten.png';
import FrightenImage from './Frighten-image.png';
import { SIGHT_RADIUS, AI_CHANGE_TURNS } from '../../../config/constants';

const Frighten = {
    name: 'Frighten',
    type: 'spell',
    target: 'enemy',
    kind: 'combat',
    range: SIGHT_RADIUS,
    damage: '2d6',
    manaCost: 27,
    size: { width: 40, height: 40, total: 200 },
    image: FrightenImage,
    sprite: FrightenSprite,
    description:
        'Everybody was kung-fu fighting! Those kicks were fast as lightning! In fact it was a little bit...',
    unlockLevel: 13,
    effects: {
        changeAI: {
            to: 'frightened',
            turns: AI_CHANGE_TURNS,
            effect: 'frighten',
        },
    },
};

export default Frighten;
