// Credit: https://kvsr.itch.io/pixelarteffectfx017
import LightningBoltSprite from './LightningBolt.png';
import LightningBoltImage from './LightningBolt-image.png';
import {
    SIGHT_RADIUS,
    AI_CHANGE_TURNS,
    SHOCK_DAMAGE,
} from '../../../config/constants';

const LightningBolt = {
    name: 'Lightning Bolt',
    type: 'spell',
    target: 'enemy',
    kind: 'combat',
    range: SIGHT_RADIUS,
    damage: '1d6 + 3',
    manaCost: 26,
    size: { width: 40, height: 40, total: 200 },
    image: LightningBoltImage,
    sprite: LightningBoltSprite,
    description:
        'Ever wanted to be a Greek god? Well, this is all you get buddy.',
    unlockLevel: 8,
    effects: {
        changeAI: {
            to: 'shocked',
            turns: AI_CHANGE_TURNS,
            effect: 'shock',
            // 25% Chance of it proc'ing
            proc: () => Math.floor(Math.random() * 99) + 1 < 25,
            chance: '25%',
            extraDamage: {
                damage: SHOCK_DAMAGE,
                times: AI_CHANGE_TURNS,
            },
        },
    },
};

export default LightningBolt;
