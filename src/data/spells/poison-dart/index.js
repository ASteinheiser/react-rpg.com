// Credit: https://kvsr.itch.io/pixelarteffectfx017
import PoisonDartSprite from './PoisonDart.png';
import PoisonDartImage from './PoisonDart-image.png';
import {
    SIGHT_RADIUS,
    AI_CHANGE_TURNS,
    TURNS_FOR_POISON,
    POISON_DAMAGE,
} from '../../../config/constants';

const PoisonDart = {
    name: 'Poison Dart',
    type: 'spell',
    target: 'enemy',
    kind: 'combat',
    range: SIGHT_RADIUS,
    damage: '2d4',
    manaCost: 18,
    size: { width: 40, height: 40, total: 200 },
    image: PoisonDartImage,
    sprite: PoisonDartSprite,
    description: 'Life is easier when no-one else is around.',
    unlockLevel: 8,
    effects: {
        changeAI: {
            to: 'poisoned',
            turns: AI_CHANGE_TURNS * TURNS_FOR_POISON,
            effect: 'poison',
            extraDamage: { damage: POISON_DAMAGE, times: TURNS_FOR_POISON },
        },
    },
};

export default PoisonDart;
