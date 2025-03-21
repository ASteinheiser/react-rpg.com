// Credit: https://kvsr.itch.io/pixelarteffectfx017
import ThunderStormSprite from './ThunderStorm.png';
import ThunderStormImage from './ThunderStorm-image.png';
import {
    SIGHT_RADIUS,
    AI_CHANGE_TURNS,
    SHOCK_DAMAGE,
} from '../../../config/constants';

const ThunderStorm = {
    name: 'Thunder Storm',
    type: 'spell',
    target: 'enemy',
    kind: 'combat',
    range: SIGHT_RADIUS,
    damage: '2d6 + 6',
    manaCost: 68,
    size: { width: 40, height: 40, total: 200 },
    image: ThunderStormImage,
    sprite: ThunderStormSprite,
    description: 'Thunder! Ah! Thunder! Ah! Thunder! Ah!',
    unlockLevel: 23,
    effects: {
        changeAI: {
            to: 'shocked',
            turns: AI_CHANGE_TURNS * 2,
            effect: 'shock',
            // 25% Chance of it proc'ing
            proc: () => Math.floor(Math.random() * 99) + 1 < 50,
            chance: '50%',
            extraDamage: {
                damage: SHOCK_DAMAGE,
                times: AI_CHANGE_TURNS * 2,
            },
        },
    },
};

export default ThunderStorm;
