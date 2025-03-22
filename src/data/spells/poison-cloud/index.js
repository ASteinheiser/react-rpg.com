// Credit: https://kvsr.itch.io/pixelarteffectfx017
import PoisonCloudSprite from './PoisonCloud.png';
import PoisonCloudImage from './PoisonCloud-image.png';
import {
    SIGHT_RADIUS,
    AI_CHANGE_TURNS,
    TURNS_FOR_POISON,
    POISON_DAMAGE,
} from '../../../config/constants';

const PoisonCloud = {
    name: 'Poison Cloud',
    type: 'spell',
    target: 'enemy',
    kind: 'combat',
    range: SIGHT_RADIUS,
    damage: '2d6 + 3',
    manaCost: 61,
    size: { width: 40, height: 40, total: 200 },
    image: PoisonCloudImage,
    sprite: PoisonCloudSprite,
    description: 'Eeeew. Who did that?',
    unlockLevel: 20,
    effects: {
        changeAI: {
            to: 'poisoned',
            turns: AI_CHANGE_TURNS * TURNS_FOR_POISON * 2,
            effect: 'poison',
            extraDamage: { damage: POISON_DAMAGE, times: TURNS_FOR_POISON * 2 },
        },
    },
};

export default PoisonCloud;
